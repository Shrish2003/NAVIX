import json
import threading
import logging
import time
from kafka import KafkaConsumer
from kafka.errors import NoBrokersAvailable
from app.core.config import settings
from app.models.vehicle import VehicleState
from app.services.state_manager import state_manager

logger = logging.getLogger(__name__)
logger.info("kafka_consumer imported state_manager id=%s", id(state_manager))

class VehicleKafkaConsumer:
    def __init__(self):
        self.consumer = None
        self.running = False
        self.thread = None

    def start(self):
        if self.running:
            logger.info("Kafka consumer is already running.")
            return
        self.running = True
        print(f"Kafka consumer state_manager id={id(state_manager)}")
        self.thread = threading.Thread(target=self._consume_loop, daemon=True)
        self.thread.start()
        logger.info(
            "Kafka consumer thread started for broker=%s topic=%s",
            settings.kafka_broker,
            settings.kafka_topic,
        )

    def stop(self):
        self.running = False
        if self.consumer:
            self.consumer.close()
        logger.info("Kafka consumer stopped.")

    def _consume_loop(self):
        retry_delay_seconds = 3
        logged_assignment = False

        while self.running:
            try:
                logger.info(
                    "Attempting Kafka connection to broker=%s topic=%s",
                    settings.kafka_broker,
                    settings.kafka_topic,
                )
                self.consumer = KafkaConsumer(
                    settings.kafka_topic,
                    bootstrap_servers=settings.kafka_broker,
                    value_deserializer=None,
                    auto_offset_reset="earliest",
                    enable_auto_commit=True,
                    consumer_timeout_ms=1000,
                )
                logger.info(
                    "Kafka consumer connected to %s",
                    settings.kafka_broker,
                )
                logger.info("Kafka consumer connected")
                logger.info("Kafka subscribed to topic=%s", settings.kafka_topic)
                logger.info("Kafka consumer using state_manager id=%s", id(state_manager))

                while self.running:
                    records = self.consumer.poll(timeout_ms=1000)
                    if not logged_assignment and self.consumer.assignment():
                        logger.info(
                            "Kafka assigned partitions for topic=%s: %s",
                            settings.kafka_topic,
                            sorted(str(partition) for partition in self.consumer.assignment()),
                        )
                        logged_assignment = True
                    if not records:
                        continue

                    for topic_partition, messages in records.items():
                        logger.debug("Received %d record(s) from %s", len(messages), topic_partition)
                        for message in messages:
                            if not self.running:
                                break

                            try:
                                raw_value = message.value
                                logger.info(
                                    "Raw message received offset=%s partition=%s value=%s",
                                    message.offset,
                                    message.partition,
                                    raw_value,
                                )

                                if isinstance(raw_value, bytes):
                                    raw_text = raw_value.decode("utf-8")
                                else:
                                    raw_text = str(raw_value)

                                logger.info("Kafka decoded payload text=%s", raw_text)

                                try:
                                    data = json.loads(raw_text)
                                except json.JSONDecodeError as parse_error:
                                    logger.error(
                                        "Kafka JSON parsing failed at offset=%s partition=%s topic=%s error=%s payload=%s",
                                        message.offset,
                                        message.partition,
                                        topic_partition.topic,
                                        parse_error,
                                        raw_text,
                                    )
                                    continue

                                logger.info("Kafka decoded JSON message: %s", data)
                                logger.info("Kafka message parsed for vehicle_id=%s", data.get("vehicle_id"))
                                vehicle_state = VehicleState(**data)
                                logger.info("Validated VehicleState for vehicle_id=%s", vehicle_state.vehicle_id)
                                state_manager.update_vehicle(vehicle_state)
                            except Exception as e:
                                logger.exception("Error processing kafka message: %s", e)

                logger.info("Kafka consumer loop stopped for broker=%s topic=%s", settings.kafka_broker, settings.kafka_topic)

            except NoBrokersAvailable as e:
                if not self.running:
                    break

                logger.error(
                    "NoBrokersAvailable while connecting to %s: %s",
                    settings.kafka_broker,
                    e,
                )
                logger.info("Retrying Kafka connection in %d seconds...", retry_delay_seconds)
                time.sleep(retry_delay_seconds)
            except Exception as e:
                if not self.running:
                    break

                logger.warning(
                    "Kafka consumer failed to connect or crashed: %s. Retrying in %d seconds...",
                    e,
                    retry_delay_seconds,
                )
                time.sleep(retry_delay_seconds)
            finally:
                if self.consumer is not None:
                    try:
                        self.consumer.close()
                    except Exception:
                        pass
                    self.consumer = None

kafka_consumer_service = VehicleKafkaConsumer()
