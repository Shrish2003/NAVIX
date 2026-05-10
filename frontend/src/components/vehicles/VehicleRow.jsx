import React from 'react';
import VehicleStatusBadge from './VehicleStatusBadge';

const VehicleRow = ({ vehicle, isSelected, onSelect }) => {
  return (
    <tr 
      onClick={() => onSelect && onSelect(vehicle.vehicle_id)}
      className={`transition-all cursor-pointer group/row border-b border-slate-800/50 hover:bg-slate-800/40 hover:shadow-[inset_0_0_15px_rgba(59,130,246,0.05)]
        ${isSelected ? 'bg-blue-900/10' : 'bg-transparent'}`}
    >
      {/* Selection Indicator */}
      <td className="pl-3 py-3 w-1">
        <div className={`w-1 h-8 rounded-full transition-colors ${isSelected ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'bg-transparent group-hover/row:bg-slate-600'}`}></div>
      </td>
      
      {/* Vehicle ID & Driver */}
      <td className="px-4 py-3">
        <div className="flex flex-col">
          <span className="font-bold text-slate-200 text-sm tracking-wide">{vehicle.vehicle_id}</span>
        </div>
      </td>
      
      {/* Status */}
      <td className="px-4 py-3">
        <VehicleStatusBadge status={vehicle.status} />
      </td>

      {/* Current Route & ETA */}
      <td className="px-4 py-3">
        <div className="flex flex-col max-w-[150px] truncate">
          <span className="text-xs font-semibold text-slate-300 truncate" title={vehicle.current_route}>{vehicle.current_route || "Unknown"}</span>
          <span className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-widest font-bold text-blue-400">ETA: {vehicle.eta || "-"}</span>
        </div>
      </td>

      {/* Speed */}
      <td className="px-4 py-3">
        <div className="flex items-end gap-1">
          <span className="text-sm font-bold text-slate-200">{vehicle.speed || 0}</span>
          <span className="text-[9px] text-slate-500 uppercase tracking-widest pb-0.5">km/h</span>
        </div>
      </td>

      {/* Fuel Level */}
      <td className="px-4 py-3 w-32">
        <div className="flex flex-col gap-1.5 mt-1">
          <div className="flex justify-between items-center text-[9px] font-bold text-slate-400">
            <span>FUEL</span>
            <span>{vehicle.fuel_level || 0}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden shadow-inner">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${
                vehicle.fuel_level > 50 ? 'bg-emerald-500' : vehicle.fuel_level > 20 ? 'bg-amber-500' : 'bg-rose-500'
              }`} 
              style={{ width: `${vehicle.fuel_level || 0}%` }}
            ></div>
          </div>
        </div>
      </td>

      {/* Last Updated */}
      <td className="px-4 py-3 text-right">
        <span className="text-[9px] uppercase tracking-widest text-slate-500 font-medium">{vehicle.last_updated || "Just now"}</span>
      </td>
    </tr>
  );
};

export default VehicleRow;
