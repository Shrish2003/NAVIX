import threading
import logging
from typing import Dict, List, Optional
from app.models.vehicle import VehicleState

logger = logging.getLogger(__name__)

class StateManager:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._state = {}
            cls._instance._lock = threading.Lock()
            logger.info("StateManager singleton created id=%s", id(cls._instance))
        return cls._instance

    def __init__(self):
        # Singleton initialization is handled in __new__.
        pass

    def update_vehicle(self, vehicle: VehicleState):
        with self._lock:
            self._state[vehicle.vehicle_id] = vehicle
            logger.info(
                "StateManager stored vehicle_id=%s total_vehicles=%d",
                vehicle.vehicle_id,
                len(self._state),
            )

    def get_all_vehicles(self) -> List[VehicleState]:
        with self._lock:
            logger.debug("StateManager returning %d vehicles", len(self._state))
            return list(self._state.values())

    def get_vehicle(self, vehicle_id: str) -> Optional[VehicleState]:
        with self._lock:
            logger.debug("StateManager lookup for vehicle_id=%s found=%s", vehicle_id, vehicle_id in self._state)
            return self._state.get(vehicle_id)

state_manager = StateManager()
logger.info("state_manager global instance id=%s", id(state_manager))
