import React from 'react';

const RecommendationPanel = ({ reasoning, savings, confidence }) => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-slate-700 p-5 group hover:border-slate-500 transition-colors shadow-lg shadow-black/20">
      {/* Background glowing orb */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-colors duration-500 pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-purple-400 animate-pulse drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">AI Reasoning Summary</h3>
          </div>
          <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20 shadow-[0_0_8px_rgba(168,85,247,0.15)]">
            {confidence}% Confidence
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          {reasoning}
        </p>

        <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Estimated Savings</span>
          </div>
          <span className="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.15)]">
            {savings}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecommendationPanel;
