import React from 'react';
import RouteTimeline from './RouteTimeline';

const RouteDetailDrawer = ({ routeId, onClose }) => {
  if (!routeId) return null;

  return (
    <div className="h-full flex flex-col bg-slate-900/95 border border-slate-700/80 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden relative backdrop-blur-xl animate-fade-in">
      <div className="flex justify-between items-center p-4 border-b border-slate-700/80 bg-slate-950/90 relative z-20">
        <h2 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Route Details
        </h2>
        <button onClick={onClose} className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6 relative z-10">
        {/* Header Block */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">{routeId}</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 font-medium bg-slate-950 px-2 py-0.5 rounded border border-slate-800 inline-block">Assigned to V-101</p>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.2)]">
            Optimized
          </span>
        </div>

        {/* AI Insights Panel */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/40 rounded-xl p-4 shadow-[0_0_15px_rgba(59,130,246,0.1)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full pointer-events-none group-hover:bg-blue-500/30 transition-colors duration-500"></div>
          <h3 className="text-[9px] font-bold text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2 relative z-10">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            AI Navigation Insight
          </h3>
          <p className="text-xs text-slate-200 font-medium relative z-10 leading-relaxed">
            Traffic near Sitabuldi may increase ETA by <span className="text-amber-400 font-bold">8 minutes</span>. NAVIX AI suggests continuing on current route as alternative paths carry higher disruption risk.
          </p>
        </div>

        {/* Route Impact Analysis */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-3 shadow-inner hover:border-slate-700 transition-colors">
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-1.5 flex items-center gap-1.5">
              <svg className="w-3 h-3 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Traffic Impact
            </p>
            <p className="text-sm font-bold text-amber-400">Moderate <span className="text-[10px] text-amber-500/70 ml-1">+8m</span></p>
          </div>
          <div className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-3 shadow-inner hover:border-slate-700 transition-colors">
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-1.5 flex items-center gap-1.5">
              <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              Weather Impact
            </p>
            <p className="text-sm font-bold text-emerald-400">Clear <span className="text-[10px] text-emerald-500/70 ml-1">0m</span></p>
          </div>
        </div>

        {/* Timeline */}
        <div className="pt-2 border-t border-slate-800/80">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
            Route Progression
          </h3>
          <RouteTimeline />
        </div>
      </div>
      
      <div className="p-4 border-t border-slate-800 bg-slate-950/90 relative z-20">
        <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]">
          Force Re-Optimize Route
        </button>
      </div>
    </div>
  );
};
export default RouteDetailDrawer;
