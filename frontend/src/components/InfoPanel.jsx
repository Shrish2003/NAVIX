import React from "react";

const InfoPanel = ({ vehicle = null, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-3xl mb-3">⏳</div>
          <p className="text-slate-400">Loading details...</p>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 text-lg">Select a vehicle to view details</p>
        </div>
      </div>
    );
  }

  const weatherQuality =
    vehicle.weather_factor > 0.8
      ? "Excellent"
      : vehicle.weather_factor > 0.6
        ? "Good"
        : "Fair";

  const trafficLevel =
    vehicle.traffic_factor > 0.7
      ? "High"
      : vehicle.traffic_factor > 0.4
        ? "Medium"
        : "Low";

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-lg font-bold text-white">Vehicle Details</h2>
        <p className="text-sm text-slate-400 mt-1">{vehicle.vehicle_id}</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Vehicle ID Section */}
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <p className="text-xs text-slate-400 mb-2">VEHICLE IDENTIFIER</p>
          <p className="text-2xl font-bold text-blue-400">{vehicle.vehicle_id}</p>
          <p className="text-sm text-slate-400 mt-2">{vehicle.destination}</p>
        </div>

        {/* Current Speed */}
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <p className="text-xs text-slate-400 mb-2">CURRENT SPEED</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-green-400">{vehicle.speed}</p>
            <p className="text-sm text-slate-400">km/h</p>
          </div>
          <div className="mt-3 bg-slate-800 rounded h-2">
            <div
              className="bg-green-500 h-2 rounded"
              style={{ width: `${Math.min((vehicle.speed / 100) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Traffic Factor */}
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <p className="text-xs text-slate-400 mb-2">TRAFFIC FACTOR</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-red-400">
              {(vehicle.traffic_factor * 100).toFixed(0)}%
            </p>
          </div>
          <p className="text-sm text-slate-400 mt-2">Traffic Level: {trafficLevel}</p>
          <div className="mt-3 bg-slate-800 rounded h-2">
            <div
              className="bg-red-500 h-2 rounded"
              style={{ width: `${vehicle.traffic_factor * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Weather Factor */}
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <p className="text-xs text-slate-400 mb-2">WEATHER FACTOR</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-cyan-400">
              {(vehicle.weather_factor * 100).toFixed(0)}%
            </p>
          </div>
          <p className="text-sm text-slate-400 mt-2">Conditions: {weatherQuality}</p>
          <div className="mt-3 bg-slate-800 rounded h-2">
            <div
              className="bg-cyan-500 h-2 rounded"
              style={{ width: `${vehicle.weather_factor * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <p className="text-xs text-slate-400 mb-2">LOCATION COORDINATES</p>
          <p className="text-sm text-slate-200 font-mono">
            Latitude: {vehicle.latitude.toFixed(4)}
          </p>
          <p className="text-sm text-slate-200 font-mono mt-1">
            Longitude: {vehicle.longitude.toFixed(4)}
          </p>
        </div>

        {/* Timestamp */}
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <p className="text-xs text-slate-400 mb-2">LAST UPDATED</p>
          <p className="text-sm text-slate-200">
            {new Date(vehicle.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
