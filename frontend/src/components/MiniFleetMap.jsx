import React from 'react';
import { MapContainer, TileLayer, CircleMarker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const NAGPUR_CENTER = [21.1458, 79.0882];

// Simple controller to auto-fit bounds
function MapController({ vehicles }) {
  const map = useMap();
  React.useEffect(() => {
    if (!vehicles || vehicles.length === 0) return;
    const latlngs = vehicles
      .filter((v) => v && v.latitude != null && v.longitude != null)
      .map((v) => [v.latitude, v.longitude]);
    if (latlngs.length > 0) {
      try {
        map.fitBounds(latlngs, { padding: [20, 20] });
      } catch (e) {}
    }
  }, [vehicles, map]);
  return null;
}

const MiniFleetMap = ({ vehicles = [] }) => {
  return (
    <div className="bg-slate-950/50 border border-slate-800 rounded-xl flex flex-col shadow-lg overflow-hidden relative group">
      <div className="absolute top-4 left-4 z-[1000] pointer-events-none">
         <h3 className="text-[10px] font-bold text-slate-200 uppercase tracking-widest drop-shadow-md flex items-center gap-2 bg-slate-900/80 px-2 py-1 rounded backdrop-blur-sm border border-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            Live Network
         </h3>
      </div>
      
      {/* View Full Map Overlay Button */}
      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 z-[2000] flex items-center justify-center transition-opacity backdrop-blur-sm cursor-pointer">
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          Expand Map
        </button>
      </div>

      <div className="flex-1 w-full h-full relative z-0">
        <MapContainer 
          center={NAGPUR_CENTER} 
          zoom={11} 
          style={{ height: '100%', width: '100%', zIndex: 0 }} 
          zoomControl={false}
          dragging={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          <MapController vehicles={vehicles} />
          
          {vehicles.map((v, i) => {
            if (v.latitude == null || v.longitude == null) return null;
            return (
              <CircleMarker
                key={v.vehicle_id || i}
                center={[v.latitude, v.longitude]}
                radius={4}
                pathOptions={{ color: '#3b82f6', fillColor: '#60a5fa', fillOpacity: 1, weight: 2 }}
              />
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};
export default MiniFleetMap;
