import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapToolbar from "./MapToolbar";
import VehicleMarker from "./VehicleMarker";

const NAGPUR_CENTER = [21.1458, 79.0882];

const palette = [
  "#3b82f6", "#10b981", "#f59e0b", "#ef4444",
  "#8b5cf6", "#06b6d4", "#f97316", "#06b6d4",
];

function colorFor(id, idx) {
  if (!id) return palette[idx % palette.length];
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h << 5) - h + id.charCodeAt(i);
  return palette[Math.abs(h) % palette.length];
}

const normalizePath = (arr) => {
  if (!Array.isArray(arr)) return [];
  const out = [];
  for (const p of arr) {
    if (!p) continue;
    if (Array.isArray(p) && p.length >= 2) out.push([Number(p[0]), Number(p[1])]);
    else if (p.lat != null && p.lng != null) out.push([Number(p.lat), Number(p.lng)]);
    else if (p.latitude != null && p.longitude != null) out.push([Number(p.latitude), Number(p.longitude)]);
  }
  return out;
};

// Map controller component to handle camera movements
function MapController({ vehicles, resetTrigger, centerTrigger }) {
  const map = useMap();
  
  useEffect(() => {
    if (centerTrigger > 0) {
      map.setView(NAGPUR_CENTER, 12, { animate: true });
    }
  }, [centerTrigger, map]);

  useEffect(() => {
    if (resetTrigger > 0 && vehicles && vehicles.length > 0) {
      const latlngs = vehicles
        .filter((v) => v && v.latitude != null && v.longitude != null)
        .map((v) => [v.latitude, v.longitude]);
      if (latlngs.length > 0) {
        try {
          map.fitBounds(latlngs, { padding: [40, 40], animate: true });
        } catch (e) {
          map.setView(NAGPUR_CENTER, 12);
        }
      }
    }
  }, [resetTrigger, vehicles, map]);

  // Initial fit bounds
  useEffect(() => {
    if (!vehicles || vehicles.length === 0) {
      map.setView(NAGPUR_CENTER, 12);
      return;
    }
    const latlngs = vehicles
      .filter((v) => v && v.latitude != null && v.longitude != null)
      .map((v) => [v.latitude, v.longitude]);
    if (latlngs.length > 0) {
      try {
        map.fitBounds(latlngs, { padding: [40, 40] });
      } catch (e) {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

const FleetMap = ({ vehicles = [], selectedVehicleId, onVehicleSelect = () => {}, isLoading = false }) => {
  const [resetTrigger, setResetTrigger] = useState(0);
  const [centerTrigger, setCenterTrigger] = useState(0);

  const handleResetZoom = () => setResetTrigger(prev => prev + 1);
  const handleCenterMap = () => setCenterTrigger(prev => prev + 1);
  const handleToggleFullscreen = () => {
    // Placeholder for fullscreen logic
    console.log("Toggle fullscreen requested");
  };

  const hasVehicles = vehicles.length > 0;

  return (
    <div className="flex-1 bg-slate-950 flex flex-col overflow-hidden relative rounded-xl border border-slate-700 shadow-[0_0_20px_rgba(0,0,0,0.5)] h-full min-h-[500px]">
      
      {/* Map Toolbar */}
      <MapToolbar 
        vehicles={vehicles}
        isLoading={isLoading}
        onCenterMap={handleCenterMap}
        onResetZoom={handleResetZoom}
        onToggleFullscreen={handleToggleFullscreen}
        lastUpdated={new Date()}
      />

      {/* Main Map Area */}
      <div className="flex-1 relative w-full h-full">
        
        {/* Loading Overlay */}
        {isLoading && !hasVehicles && (
          <div className="absolute inset-0 z-[1000] flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center p-8 border border-slate-800 bg-slate-900/90 rounded-2xl shadow-2xl pointer-events-auto">
              <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
              <p className="text-slate-300 font-bold tracking-widest uppercase text-sm">Awaiting Telemetry</p>
              <p className="text-slate-500 text-xs mt-2">Connecting to fleet network...</p>
            </div>
          </div>
        )}

        {/* Empty State Overlay */}
        {!isLoading && !hasVehicles && (
          <div className="absolute inset-0 z-[1000] flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center text-center p-8 border border-slate-800 bg-slate-900/90 rounded-2xl shadow-2xl pointer-events-auto">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 border border-slate-700">
                <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-300 mb-2">No Active Vehicles</h3>
              <p className="text-sm text-slate-500 max-w-[250px]">Fleet tracking is currently offline or vehicles are out of range.</p>
            </div>
          </div>
        )}

        {/* The Leaflet Map Container */}
        <MapContainer 
          center={NAGPUR_CENTER} 
          zoom={12} 
          style={{ height: '100%', width: '100%', zIndex: 0 }} 
          dragging={true}
          zoomControl={false} // Hidden for cleaner look, utilities provide control
        >
          {/* Using CartoDB Dark Matter tile layer for an immersive dark futuristic map! */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          
          <MapController vehicles={vehicles} resetTrigger={resetTrigger} centerTrigger={centerTrigger} />

          {/* Render Polylines first so they are under the markers */}
          {useMemo(() => {
            if (!vehicles || vehicles.length === 0) return null;
            return vehicles.map((v, idx) => {
              const raw = v.route || v.path || v.route_coords || v.route_points || v.polyline || null;
              const positions = normalizePath(raw);
              if (!positions || positions.length < 2) return null;
              const c = colorFor(v.vehicle_id, idx);
              return (
                <Polyline
                  key={`poly-${v.vehicle_id}`}
                  positions={positions}
                  pathOptions={{ color: c, weight: 4, opacity: 0.6 }}
                />
              );
            });
          }, [vehicles])}

          {/* Render Markers */}
          {vehicles.map((v, idx) => {
            const isSelected = selectedVehicleId === v.vehicle_id;
            const c = colorFor(v.vehicle_id, idx);
            return (
              <VehicleMarker 
                key={`m-${v.vehicle_id}-${idx}`}
                vehicle={v}
                isSelected={isSelected}
                color={c}
                onClick={onVehicleSelect}
              />
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default FleetMap;
