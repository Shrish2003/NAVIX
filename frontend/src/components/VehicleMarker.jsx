import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import truckSvg from "../assets/truck.svg";

const createTruckIcon = (isActive, isSelected, color) => {
  const glow = isActive ? `box-shadow: 0 0 12px ${color};` : '';
  const scaleClass = isSelected ? 'scale-125 z-50' : 'hover:scale-110';
  
  const html = `
    <div class="relative group cursor-pointer transition-transform duration-300 transform ${scaleClass}" style="width: 32px; height: 32px;">
      ${isActive ? `<div class="absolute inset-0 rounded-full animate-ping opacity-40" style="background-color: ${color}; transform: scale(1.3);"></div>` : ''}
      <div class="absolute inset-0 rounded-full opacity-30 blur-[4px] group-hover:opacity-60 transition-opacity duration-300" style="background-color: ${color}; transform: scale(1.2);"></div>
      <div class="relative z-10 rounded-full bg-slate-900 border border-slate-700 p-1 flex items-center justify-center transition-all duration-300 group-hover:border-slate-400" style="${glow}">
        <img src="${truckSvg}" style="width: 20px; height: 20px; filter: drop-shadow(0 0 2px rgba(255,255,255,0.5));" />
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-truck-marker bg-transparent border-none',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });
};

const VehicleMarker = ({ vehicle, isSelected, color, onClick }) => {
  if (!vehicle || vehicle.latitude == null || vehicle.longitude == null) return null;
  
  const isActive = vehicle.status === "active";
  const icon = createTruckIcon(isActive, isSelected, color);

  return (
    <Marker
      position={[Number(vehicle.latitude), Number(vehicle.longitude)]}
      eventHandlers={{ click: () => onClick(vehicle.vehicle_id) }}
      icon={icon}
      zIndexOffset={isSelected ? 1000 : 0}
    >
      {/* We use standard styling for the popup, but give it a bit more structure */}
      <Popup className="rounded-lg overflow-hidden border-0 shadow-xl">
        <div className="p-1 min-w-[150px]">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200">
            <span className="font-bold text-slate-800 text-sm tracking-wide">{vehicle.vehicle_id}</span>
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${isActive ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
              {vehicle.status || "Unknown"}
            </span>
          </div>
          <div className="space-y-1.5 text-xs text-slate-600 font-medium">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Speed</span>
              <span className="font-bold text-slate-700">{vehicle.speed ?? "N/A"} <span className="text-[10px] font-normal text-slate-400">km/h</span></span>
            </div>
            {vehicle.traffic_factor != null && (
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Traffic</span>
                <span className="font-bold text-slate-700">{(vehicle.traffic_factor * 100).toFixed(0)}%</span>
              </div>
            )}
            {vehicle.weather_factor != null && (
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Weather</span>
                <span className="font-bold text-slate-700">{(vehicle.weather_factor * 100).toFixed(0)}%</span>
              </div>
            )}
          </div>
          {vehicle.timestamp && (
            <div className="mt-3 pt-2 border-t border-slate-100 text-[9px] text-slate-400 text-center uppercase tracking-wider">
              {new Date(vehicle.timestamp).toLocaleTimeString()}
            </div>
          )}
        </div>
      </Popup>
    </Marker>
  );
};

export default VehicleMarker;
