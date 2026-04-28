import React from "react";

const KPISection = ({ 
    vehicles = [] }) => {
  // Calculate KPIs
  const totalVehicles = vehicles?.length || 0;
  const activeVehicles = vehicles.filter((v) => v.status === "active").length;
  const avgSpeed =
    totalVehicles > 0
      ? (vehicles.reduce((sum, v) => sum + v.speed, 0) / totalVehicles).toFixed(1)
      : 0;

  const avgTraffic =
    totalVehicles > 0
      ? (
          vehicles.reduce((sum, v) => sum + v.traffic_factor, 0) / totalVehicles
        ).toFixed(2)
      : 0;

  const trafficLevel =
    avgTraffic > 0.7 ? "High" : avgTraffic > 0.4 ? "Medium" : "Low";

  const avgWeather =
    totalVehicles > 0
      ? (
          vehicles.reduce((sum, v) => sum + v.weather_factor, 0) / totalVehicles
        ).toFixed(2)
      : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {/* Total Vehicles */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all">
        <p className="text-xs text-slate-400 mb-2">Total Vehicles</p>
        <p className="text-3xl font-bold text-blue-400">{totalVehicles}</p>
        <p className="text-xs text-slate-500 mt-2">Fleet size</p>
      </div>

      {/* Active Vehicles */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all">
        <p className="text-xs text-slate-400 mb-2">Active</p>
        <p className="text-3xl font-bold text-green-400">{activeVehicles}</p>
        <p className="text-xs text-slate-500 mt-2">
          {totalVehicles > 0 ? ((activeVehicles / totalVehicles) * 100).toFixed(0) : "0"}% operational
        </p>
      </div>

      {/* Average Speed */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all">
        <p className="text-xs text-slate-400 mb-2">Avg Speed</p>
        <p className="text-3xl font-bold text-emerald-400">{avgSpeed}</p>
        <p className="text-xs text-slate-500 mt-2">km/h</p>
      </div>

      {/* Traffic Level */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all">
        <p className="text-xs text-slate-400 mb-2">Traffic Level</p>
        <p
          className={`text-3xl font-bold ${
            trafficLevel === "High"
              ? "text-red-400"
              : trafficLevel === "Medium"
                ? "text-yellow-400"
                : "text-green-400"
          }`}
        >
          {trafficLevel}
        </p>
        <p className="text-xs text-slate-500 mt-2">
          {(avgTraffic * 100).toFixed(0)}% factor
        </p>
      </div>

      {/* Weather Average */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all">
        <p className="text-xs text-slate-400 mb-2">Weather Impact</p>
        <p className="text-3xl font-bold text-cyan-400">
          {(avgWeather * 100).toFixed(0)}%
        </p>
        <p className="text-xs text-slate-500 mt-2">Condition factor</p>
      </div>

      {/* Max Speed */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all">
        <p className="text-xs text-slate-400 mb-2">Max Speed</p>
        <p className="text-3xl font-bold text-orange-400">
          {Math.max(...vehicles.map((v) => v.speed), 0)}
        </p>
        <p className="text-xs text-slate-500 mt-2">km/h</p>
      </div>

      {/* Min Speed */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all">
        <p className="text-xs text-slate-400 mb-2">Min Speed</p>
        <p className="text-3xl font-bold text-purple-400">
          {vehicles.length > 0
            ? Math.min(...vehicles.map((v) => v.speed))
            : 0}
        </p>
        <p className="text-xs text-slate-500 mt-2">km/h</p>
      </div>

      {/* System Status */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all">
        <p className="text-xs text-slate-400 mb-2">System Status</p>
        <p className="text-3xl font-bold text-lime-400">✓</p>
        <p className="text-xs text-slate-500 mt-2">
          <span className="inline-block w-2 h-2 bg-lime-400 rounded-full mr-1"></span>
          Operational
        </p>
      </div>
    </div>
  );
};

export default KPISection;
