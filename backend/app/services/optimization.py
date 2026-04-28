from app.models.vehicle import VehicleState
from app.core.config import settings

def calculate_cost(vehicle: VehicleState) -> float:
    # Calculate the optimization cost based on dynamic weights. Lower cost is better.
    cost = (
        settings.weight_traffic * vehicle.traffic_factor +
        settings.weight_weather * vehicle.weather_factor -
        settings.weight_speed * vehicle.speed
    )
    return cost
