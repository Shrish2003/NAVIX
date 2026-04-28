import logging
from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from app.models.vehicle import VehicleState
from app.services.state_manager import state_manager
from app.services.intelligence_engine import intelligence_engine

router = APIRouter()
logger = logging.getLogger(__name__)
logger.info("API routes imported state_manager id=%s", id(state_manager))

@router.get("/vehicles", response_model=List[VehicleState])
def get_all_vehicles():
    # Return all current vehicle states from the in-memory store.
    print(f"/vehicles handler state_manager id={id(state_manager)}")
    logger.info("/vehicles handler state_manager id=%s", id(state_manager))
    return state_manager.get_all_vehicles()

@router.get("/vehicle/{id}", response_model=VehicleState)
def get_vehicle(id: str):
    # Return a specific vehicle state by its ID.
    vehicle = state_manager.get_vehicle(id)
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle

@router.get("/optimize", response_model=Dict[str, Any])
def get_optimization():
    # Return the selected optimal vehicle, its cost, reasoning, and fleet ranking.
    return intelligence_engine.analyze_fleet()
