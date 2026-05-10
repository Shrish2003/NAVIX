import React from "react";
import KPIStatCard from "./KPIStatCard";

// Simple inline SVG icons
const Icons = {
  Truck: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  Active: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Speed: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Traffic: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  Weather: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  MaxSpeed: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
    </svg>
  ),
  MinSpeed: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
    </svg>
  ),
  System: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  )
};

const KPISection = ({ vehicles = [], isLoading = false }) => {
  // Calculate KPIs
  const totalVehicles = vehicles?.length || 0;
  const activeVehicles = vehicles.filter((v) => v.status === "active").length;
  
  const activePercentage = totalVehicles > 0 ? ((activeVehicles / totalVehicles) * 100).toFixed(0) : "0";

  const avgSpeed =
    totalVehicles > 0
      ? (vehicles.reduce((sum, v) => sum + v.speed, 0) / totalVehicles).toFixed(1)
      : 0;

  const avgTraffic =
    totalVehicles > 0
      ? (vehicles.reduce((sum, v) => sum + v.traffic_factor, 0) / totalVehicles).toFixed(2)
      : 0;

  const trafficLevel =
    avgTraffic > 0.7 ? "High" : avgTraffic > 0.4 ? "Medium" : "Low";

  const avgWeather =
    totalVehicles > 0
      ? (vehicles.reduce((sum, v) => sum + v.weather_factor, 0) / totalVehicles).toFixed(2)
      : 0;

  const maxSpeed = totalVehicles > 0 ? Math.max(...vehicles.map((v) => v.speed), 0) : 0;
  const minSpeed = totalVehicles > 0 ? Math.min(...vehicles.map((v) => v.speed)) : 0;

  // Determine if there is actual data or empty array
  const hasData = totalVehicles > 0;
  const displayLoading = isLoading;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Total Vehicles */}
      <KPIStatCard
        title="Total Vehicles"
        value={totalVehicles}
        subtitle="Registered in fleet"
        icon={Icons.Truck}
        colorClass="text-blue-400"
        hoverGlow="hover:shadow-blue-500/15 group-hover:border-blue-500/30"
        loading={displayLoading}
      />

      {/* Active Vehicles */}
      <KPIStatCard
        title="Active Vehicles"
        value={activeVehicles}
        subtitle={`${activePercentage}% operational`}
        icon={Icons.Active}
        colorClass="text-emerald-400"
        hoverGlow="hover:shadow-emerald-500/15 group-hover:border-emerald-500/30"
        loading={displayLoading}
        trend={hasData ? { value: "Live", isPositive: true } : null}
      />

      {/* Average Speed */}
      <KPIStatCard
        title="Avg Speed"
        value={avgSpeed}
        subtitle="km/h across fleet"
        icon={Icons.Speed}
        colorClass="text-cyan-400"
        hoverGlow="hover:shadow-cyan-500/15 group-hover:border-cyan-500/30"
        loading={displayLoading}
      />

      {/* Traffic Level */}
      <KPIStatCard
        title="Traffic Level"
        value={trafficLevel}
        subtitle={`${(avgTraffic * 100).toFixed(0)}% impact factor`}
        icon={Icons.Traffic}
        colorClass={
          trafficLevel === "High"
            ? "text-rose-400"
            : trafficLevel === "Medium"
              ? "text-amber-400"
              : "text-emerald-400"
        }
        hoverGlow={
          trafficLevel === "High"
            ? "hover:shadow-rose-500/15 group-hover:border-rose-500/30"
            : trafficLevel === "Medium"
              ? "hover:shadow-amber-500/15 group-hover:border-amber-500/30"
              : "hover:shadow-emerald-500/15 group-hover:border-emerald-500/30"
        }
        loading={displayLoading}
      />

      {/* Weather Impact */}
      <KPIStatCard
        title="Weather Impact"
        value={`${(avgWeather * 100).toFixed(0)}%`}
        subtitle="Condition severity"
        icon={Icons.Weather}
        colorClass="text-sky-400"
        hoverGlow="hover:shadow-sky-500/15 group-hover:border-sky-500/30"
        loading={displayLoading}
      />

      {/* Max Speed */}
      <KPIStatCard
        title="Max Speed"
        value={maxSpeed}
        subtitle="Top speed recorded"
        icon={Icons.MaxSpeed}
        colorClass="text-orange-400"
        hoverGlow="hover:shadow-orange-500/15 group-hover:border-orange-500/30"
        loading={displayLoading}
      />

      {/* Min Speed */}
      <KPIStatCard
        title="Min Speed"
        value={minSpeed}
        subtitle="Lowest active speed"
        icon={Icons.MinSpeed}
        colorClass="text-purple-400"
        hoverGlow="hover:shadow-purple-500/15 group-hover:border-purple-500/30"
        loading={displayLoading}
      />

      {/* System Status */}
      <KPIStatCard
        title="System Status"
        statusChip={hasData ? "Operational" : "Waiting"}
        subtitle={hasData ? "All systems nominal" : "Awaiting telemetry"}
        icon={Icons.System}
        hoverGlow="hover:shadow-lime-500/15 group-hover:border-lime-500/30"
        loading={displayLoading}
      />
    </div>
  );
};

export default KPISection;
