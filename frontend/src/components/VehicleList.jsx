import React from "react";
import VehicleCard from "./VehicleCard";

const VehicleList = ({ vehicles = [], selectedVehicleId, onVehicleSelect = () => {} }) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-lg font-bold text-white">Fleet Vehicles</h2>
        <p className="text-sm text-slate-400 mt-1">
          {vehicles.length} vehicle{vehicles.length !== 1 ? "s" : ""} active
        </p>
      </div>

      {/* Vehicle List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.vehicle_id}
              vehicle={vehicle}
              isSelected={selectedVehicleId === vehicle.vehicle_id}
              onSelect={() => onVehicleSelect(vehicle.vehicle_id)}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-slate-400 text-lg">No vehicles available</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleList;
