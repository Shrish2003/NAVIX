import React from 'react';
import VehicleStatusBadge from './VehicleStatusBadge';

const VehicleOverviewCard = ({ vehicle }) => {
  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-colors">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-500"></div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 shadow-inner group-hover:border-slate-600 transition-colors">
            <svg className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight drop-shadow-sm">{vehicle.vehicle_id}</h2>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5 font-semibold">Heavy Freight Class</p>
          </div>
        </div>
        <VehicleStatusBadge status={vehicle.status} />
      </div>

      <div className="grid grid-cols-2 gap-y-3 pt-3 border-t border-slate-800/80 relative z-10">
        <div>
          <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Assigned Driver</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
              <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            {/* Even though driver_name was removed from the backend, for the explicit driver profile drawer requirement we fallback visually to unassigned */}
            <p className="text-xs font-medium text-slate-300">Unassigned</p>
          </div>
        </div>
        <div>
          <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Health Status</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"></div>
            <p className="text-xs font-medium text-slate-300">Operational</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleOverviewCard;
