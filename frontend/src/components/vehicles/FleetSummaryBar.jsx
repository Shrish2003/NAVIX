import React from 'react';

const FleetSummaryBar = ({ total, active, maintenance }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
      <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800 rounded-xl p-4 flex items-center justify-between group hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/50">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1 group-hover:text-slate-400 transition-colors">Total Fleet</p>
          <p className="text-3xl font-bold text-slate-200 tracking-tight">{total || 0}</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors border border-slate-700 group-hover:border-blue-500/30">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800 rounded-xl p-4 flex items-center justify-between group hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1 group-hover:text-slate-400 transition-colors">Active Now</p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            </span>
            <p className="text-3xl font-bold text-emerald-400 tracking-tight">{active || 0}</p>
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center text-emerald-500/50 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors border border-slate-700 group-hover:border-emerald-500/30">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.818 11.293L10 15.475l8.182-8.182" />
          </svg>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800 rounded-xl p-4 flex items-center justify-between group hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1 group-hover:text-slate-400 transition-colors">In Maintenance</p>
          <p className="text-3xl font-bold text-amber-400 tracking-tight">{maintenance || 0}</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center text-amber-500/50 group-hover:text-amber-400 group-hover:bg-amber-500/10 transition-colors border border-slate-700 group-hover:border-amber-500/30">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FleetSummaryBar;
