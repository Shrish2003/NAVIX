from typing import Dict, Any
from app.services.state_manager import state_manager
from app.services.optimization import calculate_cost
from app.core.config import settings

class IntelligenceEngine:
    def analyze_fleet(self) -> Dict[str, Any]:
        vehicles = state_manager.get_all_vehicles()
        if not vehicles:
            return {
                "selected_vehicle": None,
                "cost": None,
                "reason": "No active vehicles found in state",
                "ranking": []
            }
        
        ranked_vehicles = []
        for v in vehicles:
            cost = calculate_cost(v)
            is_high_delay_risk = v.traffic_factor > settings.delay_risk_threshold
            
            # Region Awareness check (Nagpur)
            in_region = (settings.nagpur_bounds["min_lat"] <= v.latitude <= settings.nagpur_bounds["max_lat"] and
                         settings.nagpur_bounds["min_lon"] <= v.longitude <= settings.nagpur_bounds["max_lon"])
            
            ranked_vehicles.append({
                "vehicle": v,
                "cost": cost,
                "high_delay_risk": is_high_delay_risk,
                "in_region": in_region
            })
            
        # Sort by cost ascending (best candidate has lowest cost)
        ranked_vehicles.sort(key=lambda x: x["cost"])
        
        best_candidate = ranked_vehicles[0]
        
        # Formulate reasoning
        reasoning = f"Selected due to minimum calculated cost ({best_candidate['cost']:.2f}) derived from dynamic factors."
        if best_candidate['high_delay_risk']:
            reasoning += " Note: The selected vehicle is currently facing a high delay risk based on traffic factor."
        if not best_candidate['in_region']:
            reasoning += " Warning: Vehicle is outside expected Nagpur boundaries."
            
        return {
            "selected_vehicle": best_candidate["vehicle"].model_dump(),
            "cost": best_candidate["cost"],
            "reason": reasoning,
            "ranking": [
                {
                    "vehicle_id": r["vehicle"].vehicle_id,
                    "cost": r["cost"],
                    "high_delay_risk": r["high_delay_risk"]
                }
                for r in ranked_vehicles
            ]
        }

intelligence_engine = IntelligenceEngine()
