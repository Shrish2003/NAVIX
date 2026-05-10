import React from 'react';

const AIRecommendationPanel = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900/95 to-slate-950 border border-blue-500/30 rounded-xl p-5 flex flex-col gap-5 shadow-[0_0_25px_rgba(59,130,246,0.1)] h-full relative overflow-hidden group hover:border-blue-500/50 transition-colors">
      <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-700"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 blur-3xl rounded-full pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 relative z-10">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          AI Recommendation
        </h3>
        <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase tracking-wider shadow-[0_0_8px_rgba(16,185,129,0.15)]">98% Match</span>
      </div>

      <div className="flex-1 flex flex-col gap-4 relative z-10">
        {/* Suggested Vehicle */}
        <div className="bg-slate-950/70 border border-slate-800/60 rounded-xl p-3.5 flex items-center gap-3 hover:border-slate-600 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Suggested Vehicle</p>
            <p className="text-sm font-bold text-slate-100 mt-0.5">V-105</p>
          </div>
          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">Available Now</span>
        </div>

        {/* Best Driver */}
        <div className="bg-slate-950/70 border border-slate-800/60 rounded-xl p-3.5 flex items-center gap-3 hover:border-slate-600 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Best Driver Match</p>
            <p className="text-sm font-bold text-slate-100 mt-0.5">James Miller</p>
          </div>
          <span className="text-[9px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">On-duty</span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Route Efficiency", value: "96%", color: "text-emerald-400", subColor: "bg-emerald-500", pct: 96 },
            { label: "Fuel Savings Est.", value: "12%", color: "text-blue-400", subColor: "bg-blue-500", pct: 12 },
          ].map((item, i) => (
            <div key={i} className="bg-slate-950/70 border border-slate-800/60 rounded-xl p-3 hover:border-slate-600 transition-colors">
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-2">{item.label}</p>
              <p className={`text-xl font-bold leading-none ${item.color}`}>{item.value}</p>
              <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                <div className={`${item.subColor} h-full rounded-full shadow-sm`} style={{ width: item.value }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Traffic + ETA */}
        <div className="bg-slate-950/70 border border-slate-800/60 rounded-xl p-3.5 hover:border-slate-600 transition-colors">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Traffic Impact</p>
            <p className="text-[10px] font-bold text-amber-400">Low — +3 min</p>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden shadow-inner">
            <div className="bg-amber-500 h-full w-[25%] shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
          </div>
        </div>

        <div className="flex justify-between items-center bg-slate-950/70 border border-slate-800/60 rounded-xl px-4 py-3 hover:border-slate-600 transition-colors">
          <div>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Est. Delivery Time</p>
            <p className="text-lg font-bold text-slate-100 leading-none mt-1">2h 24m</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">ETA</p>
            <p className="text-sm font-bold text-blue-400 mt-1">14:38</p>
          </div>
        </div>
      </div>

      <button className="w-full py-2.5 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/40 text-blue-300 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 relative z-10 group/btn">
        Apply AI Config
        <svg className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  );
};

export default AIRecommendationPanel;
