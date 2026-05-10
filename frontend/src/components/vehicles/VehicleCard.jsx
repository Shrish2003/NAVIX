import React from 'react';
import VehicleStatusBadge from './VehicleStatusBadge';

const VehicleCard = ({ vehicle, isSelected, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect && onSelect(vehicle.vehicle_id)}
      className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer group flex flex-col h-full
        ${isSelected 
          ? 'bg-blue-900/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]' 
          : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800/50 hover:border-slate-600 hover:shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:-translate-y-1'
        }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center border shadow-inner transition-colors ${
            isSelected ? 'bg-blue-500/20 border-blue-500/30' : 'bg-slate-800 border-slate-700 group-hover:border-slate-500'
          }`}>
            <svg className={`w-5 h-5 ${isSelected ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm tracking-wide">{vehicle.vehicle_id}</h3>
          </div>
        </div>
        <VehicleStatusBadge status={vehicle.status} />
      </div>

      {/* Body */}
      <div className="flex-1 space-y-3 mb-4 mt-2 bg-slate-950/40 p-3 rounded-lg border border-slate-800/50">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Route</span>
          <span className="text-xs font-semibold text-slate-300 truncate max-w-[120px]" title={vehicle.current_route}>{vehicle.current_route || "Unknown"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">ETA</span>
          <span className="text-xs font-bold text-blue-400">{vehicle.eta || "-"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Speed</span>
          <span className="text-xs font-bold text-slate-200">{vehicle.speed || 0} km/h</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto flex flex-col gap-2 pt-2 border-t border-slate-800/80">
        <div className="flex justify-between items-center text-[9px] font-bold text-slate-400">
          <span>FUEL LEVEL</span>
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
        <p className="text-right text-[9px] text-slate-500 mt-1 uppercase tracking-widest">Updated: {vehicle.last_updated || "Just now"}</p>
      </div>
    </div>
  );
};

export default VehicleCard;
