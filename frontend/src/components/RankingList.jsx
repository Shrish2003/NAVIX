import React from 'react';

const RankingList = ({ alternatives }) => {
  if (!alternatives || alternatives.length === 0) return null;

  return (
    <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 shadow-lg shadow-black/20">
      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        Alternative Vehicle Rankings
      </h3>
      <div className="space-y-2">
        {alternatives.map((alt, idx) => {
          const score = typeof alt.score === 'number' ? alt.score.toFixed(1) : alt.score || "N/A";
          const vehicleId = alt.vehicle_id || alt.vehicle?.vehicle_id || `Vehicle-${idx+2}`;
          
          return (
            <div 
              key={idx} 
              className="flex items-center justify-between bg-slate-950/50 rounded-lg p-2.5 border border-slate-800/50 hover:bg-slate-800 transition-colors cursor-default group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-600 group-hover:text-slate-400 w-4 transition-colors">
                  {idx + 2}.
                </span>
                <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                  {vehicleId}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Score</span>
                <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {score}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RankingList;
