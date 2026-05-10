import React from 'react';

const RecommendationCard = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-blue-500/30 rounded-xl p-5 shadow-[0_0_20px_rgba(59,130,246,0.1)] relative overflow-hidden h-full flex flex-col group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-500"></div>
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          AI Recommendation
        </h3>
        <span className="px-2 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase font-bold tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.2)]">98% Match</span>
      </div>

      <div className="flex-1 space-y-4 relative z-10">
        <div className="bg-slate-950/60 border border-slate-800/60 rounded-lg p-3 shadow-inner flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Suggested Vehicle</p>
              <p className="text-sm font-bold text-slate-200">V-105</p>
            </div>
          </div>
          <p className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded">Available Now</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-950/60 border border-slate-800/60 rounded-lg p-3 shadow-inner">
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-1">Fastest Route</p>
            <p className="text-lg font-bold text-slate-200 leading-none">24 <span className="text-[10px] text-slate-500 font-normal">mins</span></p>
            <p className="text-[9px] text-blue-400 mt-1">Via Hwy 44</p>
          </div>
          <div className="bg-slate-950/60 border border-slate-800/60 rounded-lg p-3 shadow-inner">
            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-1">Fuel Savings</p>
            <p className="text-lg font-bold text-emerald-400 leading-none">12 <span className="text-[10px] text-emerald-500/70 font-normal">%</span></p>
            <p className="text-[9px] text-slate-400 mt-1">~4.5 Liters</p>
          </div>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/60 rounded-lg p-3 shadow-inner">
          <div className="flex justify-between items-center mb-1.5">
             <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Traffic Impact</p>
             <p className="text-[10px] font-bold text-amber-400">Low</p>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden shadow-inner">
             <div className="bg-amber-500 h-full w-[25%] shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-slate-800/80 relative z-10 flex justify-between items-center">
         <p className="text-[9px] text-slate-500">Auto-computed 2 mins ago</p>
         <button className="text-[10px] text-blue-400 hover:text-blue-300 font-bold uppercase tracking-wider transition-colors flex items-center gap-1 group/btn">
           Apply Config
           <svg className="w-3 h-3 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
           </svg>
         </button>
      </div>
    </div>
  );
};
export default RecommendationCard;
