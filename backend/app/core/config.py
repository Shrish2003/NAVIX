from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    kafka_broker: str = "localhost:9092"
    kafka_topic: str = "vehicle_gps"
    
    # Cost function weights
    weight_traffic: float = 1.0
    weight_weather: float = 0.5
    weight_speed: float = 0.2
    
    # Delay thresholds
    delay_risk_threshold: float = 0.8
    
    # Simulated Region bounds (Nagpur)
    nagpur_bounds: dict = {
        "min_lat": 20.8,
        "max_lat": 21.3,
        "min_lon": 78.9,
        "max_lon": 79.3
    }

settings = Settings()
