import React from 'react';

const FleetHealthWidget = ({ vehicles }) => {
  return (
    <div className="bg-slate-950/50 border border-slate-800 rounded-xl flex flex-col shadow-lg overflow-hidden group hover:border-slate-700 transition-colors">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
         <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Fleet Health Matrix
         </h3>
         <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.15)]">94% Score</span>
      </div>
      <div className="flex-1 p-4 grid grid-cols-2 gap-4">
        {/* Metric 1 */}
        <div className="flex flex-col justify-center">
          <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-2">Fuel Efficiency</p>
          <div className="flex items-end gap-1.5 mb-1.5">
            <p className="text-2xl font-bold text-blue-400 leading-none">8.4</p>
            <p className="text-[8px] text-slate-500 uppercase tracking-widest pb-0.5">km/L Avg</p>
          </div>
          <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden shadow-inner">
             <div className="bg-blue-500 h-full w-[84%] shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
          </div>
        </div>
        
        {/* Metric 2 */}
        <div className="flex flex-col justify-center">
          <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-2">On-Time Rate</p>
          <div className="flex items-end gap-1.5 mb-1.5">
            <p className="text-2xl font-bold text-emerald-400 leading-none">92</p>
            <p className="text-[8px] text-slate-500 uppercase tracking-widest pb-0.5">%</p>
          </div>
          <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden shadow-inner">
             <div className="bg-emerald-500 h-full w-[92%] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          </div>
        </div>
        
        {/* Metric 3 */}
        <div className="flex flex-col justify-center">
          <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-2">Maintenance</p>
          <div className="flex items-end gap-1.5 mb-1.5">
            <p className="text-2xl font-bold text-amber-400 leading-none">1</p>
            <p className="text-[8px] text-slate-500 uppercase tracking-widest pb-0.5">Vehicle Due</p>
          </div>
          <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden shadow-inner">
             <div className="bg-amber-500 h-full w-[15%] shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="flex flex-col justify-center">
          <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-2">Network Status</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
            <p className="text-sm font-bold text-slate-200">Stable</p>
          </div>
          <p className="text-[9px] text-slate-500 mt-1 uppercase tracking-widest">24ms latency</p>
        </div>
      </div>
    </div>
  );
};
export default FleetHealthWidget;
