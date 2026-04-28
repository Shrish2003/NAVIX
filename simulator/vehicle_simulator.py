import requests
import time
import random
import threading
import json
import logging
from datetime import datetime, timezone

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("navix-simulator")

OSRM_URL = "http://localhost:5000/route/v1/driving"
KAFKA_BROKER = "localhost:9092"
KAFKA_TOPIC = "vehicle_gps"
NUM_VEHICLES = 5  # Start with 5; scale up after confirming pipeline works

# Nagpur simulation nodes
LOCATIONS = {
    "Sitabuldi":        (21.1458, 79.0882),
    "Airport":          (21.0922, 79.0473),
    "Railway Station":  (21.1535, 79.0900),
    "MIHAN":            (21.0780, 79.0000),
}
LOCATION_LIST = list(LOCATIONS.values())


# ---------------------------------------------------------------------------
# Lazy Kafka producer – retries on startup so simulator doesn't crash if
# Kafka is still booting.
# ---------------------------------------------------------------------------
_producer = None
_producer_lock = threading.Lock()

def get_producer():
    global _producer
    if _producer is not None:
        return _producer
    with _producer_lock:
        if _producer is not None:
            return _producer
        from kafka import KafkaProducer
        while True:
            try:
                p = KafkaProducer(
                    bootstrap_servers=KAFKA_BROKER,
                    value_serializer=lambda v: json.dumps(v).encode("utf-8"),
                    retries=5,
                )
                _producer = p
                logger.info("Kafka producer connected to %s", KAFKA_BROKER)
                return _producer
            except Exception as e:
                logger.warning("Kafka not ready (%s). Retrying in 3 s...", e)
                time.sleep(3)


# ---------------------------------------------------------------------------
# Decode polyline geometry without external library dependency
# Falls back to straight-line interpolation if OSRM is unavailable.
# ---------------------------------------------------------------------------
def decode_polyline(encoded: str):
    """Google's encoded polyline decoder (no external lib needed)."""
    coords = []
    index, lat, lng = 0, 0, 0
    while index < len(encoded):
        for is_lng in (False, True):
            shift, result = 0, 0
            while True:
                b = ord(encoded[index]) - 63
                index += 1
                result |= (b & 0x1F) << shift
                shift += 5
                if b < 0x20:
                    break
            delta = ~(result >> 1) if (result & 1) else (result >> 1)
            if is_lng:
                lng += delta
            else:
                lat += delta
        coords.append((lat / 1e5, lng / 1e5))
    return coords


def get_route(start, end):
    """Fetch OSRM route; falls back to [start, end] if unavailable."""
    url = (
        f"{OSRM_URL}/{start[1]},{start[0]};{end[1]},{end[0]}"
        "?overview=full&geometries=polyline"
    )
    try:
        resp = requests.get(url, timeout=5)
        resp.raise_for_status()
        data = resp.json()
        geometry = data["routes"][0]["geometry"]
        return decode_polyline(geometry)
    except Exception as e:
        logger.warning("OSRM unavailable (%s). Using straight-line fallback.", e)
        # Linear interpolation: 10 steps between start and end
        steps = 10
        return [
            (
                start[0] + (end[0] - start[0]) * i / steps,
                start[1] + (end[1] - start[1]) * i / steps,
            )
            for i in range(steps + 1)
        ]


# ---------------------------------------------------------------------------
# Weather factor: maps condition to a numeric value consumed by cost function
# ---------------------------------------------------------------------------
WEATHER_FACTORS = {
    "clear": 0.2,
    "cloudy": 0.4,
    "rain": 0.8,
    "heavy_rain": 1.2,
    "fog": 1.0,
}

def get_weather_factor():
    condition = random.choices(
        list(WEATHER_FACTORS.keys()),
        weights=[50, 20, 15, 5, 10],
        k=1,
    )[0]
    base = WEATHER_FACTORS[condition]
    # Add small noise so values are never static
    return round(base + random.uniform(-0.05, 0.05), 3)


def get_traffic_factor():
    hour = datetime.now().hour
    if 8 <= hour <= 11 or 17 <= hour <= 20:
        return round(random.uniform(1.3, 2.0), 3)   # peak hours
    elif 0 <= hour <= 5:
        return round(random.uniform(0.3, 0.7), 3)   # night
    else:
        return round(random.uniform(0.7, 1.3), 3)   # normal


# ---------------------------------------------------------------------------
# Per-vehicle simulation loop
# ---------------------------------------------------------------------------
def simulate_vehicle(vehicle_id: str):
    logger.info("Starting simulation for %s", vehicle_id)
    producer = get_producer()

    while True:
        start, end = random.sample(LOCATION_LIST, 2)

        try:
            route = get_route(start, end)
        except Exception as e:
            logger.error("[%s] Route error: %s", vehicle_id, e)
            time.sleep(2)
            continue

        logger.info("[%s] New route: %d steps", vehicle_id, len(route))

        for lat, lon in route:
            traffic_factor = get_traffic_factor()
            weather_factor = get_weather_factor()
            # Speed inversely affected by traffic; realistic range 15-80 km/h
            raw_speed = random.uniform(30, 80)
            speed = round(raw_speed / max(traffic_factor, 0.1), 2)

            message = {
                "vehicle_id": vehicle_id,
                "latitude": round(lat, 6),
                "longitude": round(lon, 6),
                "speed": speed,
                "traffic_factor": traffic_factor,
                "weather_factor": weather_factor,
                "timestamp": datetime.now(timezone.utc).timestamp(),
            }

            try:
                logger.info("Sending Kafka payload to %s: %s", KAFKA_TOPIC, json.dumps(message))
                producer.send(KAFKA_TOPIC, message)
                logger.debug("[%s] %.6f, %.6f | spd=%.1f tf=%.2f wf=%.2f",
                             vehicle_id, lat, lon, speed, traffic_factor, weather_factor)
            except Exception as e:
                logger.error("[%s] Kafka send failed: %s", vehicle_id, e)

            time.sleep(random.uniform(0.5, 1.5))


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    logger.info("Navix Vehicle Simulator starting — %d vehicles", NUM_VEHICLES)
    logger.info("Kafka producer target broker=%s topic=%s", KAFKA_BROKER, KAFKA_TOPIC)

    threads = []
    for i in range(NUM_VEHICLES):
        t = threading.Thread(
            target=simulate_vehicle,
            args=(f"VEH_{i:03d}",),
            daemon=True,
        )
        t.start()
        threads.append(t)
        time.sleep(0.3)  # stagger starts slightly

    logger.info("All vehicles running. Press Ctrl+C to stop.")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        logger.info("Simulator stopped.")