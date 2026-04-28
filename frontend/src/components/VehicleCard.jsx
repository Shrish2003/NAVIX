import React from "react";

const VehicleCard = ({ vehicle, isSelected, onSelect }) => {
  const speedColor =
    vehicle.speed > 50
      ? "text-green-400"
      : vehicle.speed > 30
        ? "text-yellow-400"
        : "text-red-400";

  const trafficColor =
    vehicle.traffic_factor > 0.7
      ? "text-red-400"
      : vehicle.traffic_factor > 0.4
        ? "text-yellow-400"
        : "text-green-400";

  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
        isSelected
          ? "bg-slate-800 border-blue-500 shadow-lg shadow-blue-500/20"
          : "bg-slate-900 border-slate-700 hover:border-slate-600 hover:bg-slate-800"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-white">{vehicle.vehicle_id}</h3>
          <p className="text-xs text-slate-400 mt-1">{vehicle.destination}</p>
        </div>
        <div
          className={`text-sm font-semibold px-2 py-1 rounded ${
            vehicle.status === "active"
              ? "bg-green-500/20 text-green-400"
              : "bg-slate-700/20 text-slate-400"
          }`}
        >
          {vehicle.status}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Speed */}
        <div className="bg-slate-950 rounded p-2">
          <p className="text-xs text-slate-400 mb-1">Speed</p>
          <p className={`text-lg font-bold ${speedColor}`}>{vehicle.speed} km/h</p>
        </div>

        {/* Traffic Factor */}
        <div className="bg-slate-950 rounded p-2">
          <p className="text-xs text-slate-400 mb-1">Traffic</p>
          <p className={`text-lg font-bold ${trafficColor}`}>
            {(vehicle.traffic_factor * 100).toFixed(0)}%
          </p>
        </div>

        {/* Weather Factor */}
        <div className="bg-slate-950 rounded p-2">
          <p className="text-xs text-slate-400 mb-1">Weather</p>
          <p className="text-lg font-bold text-blue-400">
            {(vehicle.weather_factor * 100).toFixed(0)}%
          </p>
        </div>

        {/* Latitude/Longitude */}
        <div className="bg-slate-950 rounded p-2">
          <p className="text-xs text-slate-400 mb-1">Location</p>
          <p className="text-xs text-slate-300 font-mono">
            {vehicle.latitude.toFixed(3)}, {vehicle.longitude.toFixed(3)}
          </p>
        </div>
      </div>

      {/* Timestamp */}
      <div className="mt-3 pt-3 border-t border-slate-700">
        <p className="text-xs text-slate-500">
          Last updated: {new Date(vehicle.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default VehicleCard;
