import React from 'react';

const ActiveTasksWidget = () => {
  return (
    <div className="bg-slate-950/50 border border-slate-800 rounded-xl flex flex-col shadow-lg overflow-hidden group hover:border-slate-700 transition-colors">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
         <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Active Deliveries
         </h3>
         <button className="text-[10px] text-blue-500 hover:text-blue-400 uppercase font-bold tracking-wider transition-colors">View All</button>
      </div>
      <div className="flex-1 p-4 space-y-3 overflow-y-auto custom-scrollbar">
         {/* Task Item */}
         <div className="flex items-center justify-between bg-slate-900/40 p-3 rounded-lg border border-slate-800/50 hover:border-slate-600 hover:bg-slate-800/40 transition-colors cursor-pointer">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400 font-bold text-xs">V1</div>
             <div>
               <p className="text-xs font-bold text-slate-200">Load #4492</p>
               <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-0.5">Nagpur &rarr; Mumbai</p>
             </div>
           </div>
           <div className="text-right">
             <span className="px-2 py-0.5 rounded text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase font-bold tracking-wider shadow-[0_0_8px_rgba(16,185,129,0.1)]">In Transit</span>
             <p className="text-[9px] text-slate-500 mt-1 font-bold">ETA: 14:30</p>
           </div>
         </div>
         {/* Task Item */}
         <div className="flex items-center justify-between bg-slate-900/40 p-3 rounded-lg border border-slate-800/50 hover:border-slate-600 hover:bg-slate-800/40 transition-colors cursor-pointer">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400 font-bold text-xs">V4</div>
             <div>
               <p className="text-xs font-bold text-slate-200">Load #4495</p>
               <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-0.5">Sector 7 Local</p>
             </div>
           </div>
           <div className="text-right">
             <span className="px-2 py-0.5 rounded text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase font-bold tracking-wider shadow-[0_0_8px_rgba(245,158,11,0.1)]">Delayed</span>
             <p className="text-[9px] text-slate-500 mt-1 font-bold text-amber-500/70">ETA: 16:45</p>
           </div>
         </div>
         {/* Task Item */}
         <div className="flex items-center justify-between bg-slate-900/40 p-3 rounded-lg border border-dashed border-slate-700/80 hover:border-blue-500/50 hover:bg-slate-800/40 transition-colors cursor-pointer">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-slate-500 font-bold text-xs">-</div>
             <div>
               <p className="text-xs font-bold text-slate-200">Load #4498</p>
               <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-0.5">Pending Assignment</p>
             </div>
           </div>
           <button className="text-[9px] bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded uppercase font-bold tracking-wider transition-colors shadow-[0_0_10px_rgba(37,99,235,0.3)]">
             Assign
           </button>
         </div>
      </div>
    </div>
  );
};
export default ActiveTasksWidget;
