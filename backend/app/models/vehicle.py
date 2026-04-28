from pydantic import BaseModel

class VehicleState(BaseModel):
    vehicle_id: str
    latitude: float
    longitude: float
    speed: float
    traffic_factor: float
    weather_factor: float
    timestamp: float
