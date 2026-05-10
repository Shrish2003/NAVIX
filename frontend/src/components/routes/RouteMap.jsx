import React from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const NAGPUR_CENTER = [21.1458, 79.0882];

const MOCK_ROUTE_COORDS = [
  [21.1458, 79.0882],
  [21.1500, 79.0900],
  [21.1550, 79.0850],
  [21.1600, 79.0800],
  [21.1700, 79.0750],
  [21.1800, 79.0700]
];

// Quick auto-fit
function RouteMapController() {
  const map = useMap();
  React.useEffect(() => {
    try {
      map.fitBounds(MOCK_ROUTE_COORDS, { padding: [50, 50] });
    } catch(e) {}
  }, [map]);
  return null;
}

const RouteMap = ({ activeRouteId }) => {
  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-lg group">
      {/* Map Overlays */}
      <div className="absolute top-4 left-4 z-[1000] pointer-events-none">
         <div className="bg-slate-950/80 backdrop-blur-md border border-slate-700 rounded-xl p-3 shadow-lg flex flex-col gap-1.5">
            <h3 className="text-[10px] font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
              Live Route Tracking
            </h3>
            <p className="text-[9px] text-slate-400 font-medium">Tracking {activeRouteId || "All Active Routes"}</p>
         </div>
      </div>

      <div className="absolute bottom-4 left-4 z-[1000] pointer-events-none flex gap-2">
        <div className="bg-slate-950/80 backdrop-blur-md border border-slate-700 rounded-lg px-3 py-2 shadow-lg flex items-center gap-2">
           <div className="w-3 h-1 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
           <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Optimized Path</span>
        </div>
        <div className="bg-slate-950/80 backdrop-blur-md border border-slate-700 rounded-lg px-3 py-2 shadow-lg flex items-center gap-2">
           <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
           <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Checkpoint</span>
        </div>
      </div>

      <div className="flex-1 w-full h-full relative z-0">
        <MapContainer 
          center={NAGPUR_CENTER} 
          zoom={12} 
          style={{ height: '100%', width: '100%', zIndex: 0 }}
          zoomControl={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          <RouteMapController />
          
          {/* Main Route Polyline */}
          <Polyline 
            positions={MOCK_ROUTE_COORDS} 
            pathOptions={{ color: '#10b981', weight: 4, opacity: 0.8, dashArray: '10, 10', lineCap: 'round' }} 
          />
          
          {/* Origin/Destination Markers */}
          <CircleMarker center={MOCK_ROUTE_COORDS[0]} radius={6} pathOptions={{ color: '#3b82f6', fillColor: '#1e3a8a', fillOpacity: 1, weight: 3 }} />
          <CircleMarker center={MOCK_ROUTE_COORDS[MOCK_ROUTE_COORDS.length-1]} radius={6} pathOptions={{ color: '#f43f5e', fillColor: '#881337', fillOpacity: 1, weight: 3 }} />
          
          {/* Active Vehicle Indicator on route */}
          <CircleMarker 
            center={MOCK_ROUTE_COORDS[2]} 
            radius={8} 
            pathOptions={{ color: '#60a5fa', fillColor: '#3b82f6', fillOpacity: 1, weight: 2 }} 
          />

        </MapContainer>
      </div>
    </div>
  );
};
export default RouteMap;
