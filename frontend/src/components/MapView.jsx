import React, { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";
import truckSvg from "../assets/truck.svg";

const NAGPUR_CENTER = [21.1458, 79.0882];

function FitBounds({ vehicles }) {
  const map = useMap();
  useEffect(() => {
    if (!vehicles || vehicles.length === 0) {
      map.setView(NAGPUR_CENTER, 12);
      return;
    }
    const latlngs = vehicles
      .filter((v) => v && v.latitude != null && v.longitude != null)
      .map((v) => [v.latitude, v.longitude]);
    if (latlngs.length === 0) {
      map.setView(NAGPUR_CENTER, 12);
      return;
    }
    try {
      map.fitBounds(latlngs, { padding: [40, 40] });
    } catch (e) {
      map.setView(NAGPUR_CENTER, 12);
    }
  }, [vehicles, map]);
  return null;
}

const palette = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#f97316",
  "#06b6d4",
];

function colorFor(id, idx) {
  if (!id) return palette[idx % palette.length];
  // simple hash from id string
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h << 5) - h + id.charCodeAt(i);
  const index = Math.abs(h) % palette.length;
  return palette[index];
}

const normalizePath = (arr) => {
  if (!Array.isArray(arr)) return [];
  const out = [];
  for (const p of arr) {
    if (!p) continue;
    if (Array.isArray(p) && p.length >= 2) {
      out.push([Number(p[0]), Number(p[1])]);
    } else if (p.lat != null && p.lng != null) {
      out.push([Number(p.lat), Number(p.lng)]);
    } else if (p.latitude != null && p.longitude != null) {
      out.push([Number(p.latitude), Number(p.longitude)]);
    }
  }
  return out;
};

// Configure Leaflet's default icon paths (fixes blank/default-marker issue in many bundlers)
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: iconShadowUrl,
});

// Custom truck icon (local SVG asset)
const truckIcon = new L.Icon({
  iconUrl: truckSvg,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
  shadowUrl: iconShadowUrl,
  shadowSize: [41, 41],
});

const MapView = ({ vehicles = [], selectedVehicleId, onVehicleSelect = () => {} }) => {
  return (
    <div className="flex-1 bg-slate-950 border-l border-slate-700 p-2 overflow-hidden">
      <div className="mb-2 flex justify-between items-center px-2">
        <h2 className="text-lg font-bold text-white">Fleet Map</h2>
        <div className="text-sm text-slate-400">Nagpur Region • {vehicles.length} vehicles</div>
      </div>

      {/* Fixed visible height to avoid collapsing parent containers */}
      <div className="w-full rounded-lg overflow-hidden border border-slate-700" style={{ height: 500 }}>
        <MapContainer center={NAGPUR_CENTER} zoom={12} style={{ height: '100%', width: '100%' }} dragging={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FitBounds vehicles={vehicles} />

          {vehicles.map((v, idx) => {
            if (!v || v.latitude == null || v.longitude == null) return null;
            const isSelected = selectedVehicleId === v.vehicle_id;

            return (
              <Marker
                key={`m-${v.vehicle_id}-${idx}`}
                position={[Number(v.latitude), Number(v.longitude)]}
                eventHandlers={{ click: () => onVehicleSelect(v.vehicle_id) }}
                icon={truckIcon}
              >
                <Popup>
                  <div className="text-sm">
                    <div className="font-bold">{v.vehicle_id}</div>
                    <div>Speed: {v.speed ?? "N/A"} km/h</div>
                    {v.traffic_factor != null && <div>Traffic: {(v.traffic_factor * 100).toFixed(0)}%</div>}
                    {v.weather_factor != null && <div>Weather: {(v.weather_factor * 100).toFixed(0)}%</div>}
                    {v.timestamp && <div className="text-xs text-slate-400">{new Date(v.timestamp).toLocaleString()}</div>}
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {/** Polylines: compute memoized to avoid re-creating arrays each render */}
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
                  pathOptions={{ color: c, weight: 3, opacity: 0.85 }}
                />
              );
            });
          }, [vehicles])}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
