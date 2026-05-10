import React, { useState } from 'react';
import InsightCard, { AI_INSIGHTS } from '../components/insights/InsightCard';

const METRICS = [
  { label: "Fleet Efficiency", value: "94", unit: "%", delta: "+2.3%", up: true, color: "text-emerald-400", bar: 94, barColor: "bg-emerald-500" },
  { label: "AI Optimizations Today", value: "47", unit: "actions", delta: "+12 vs yesterday", up: true, color: "text-blue-400", bar: 78, barColor: "bg-blue-500" },
  { label: "Fuel Saved This Week", value: "312", unit: "L", delta: "≈ ₹28,400", up: true, color: "text-purple-400", bar: 62, barColor: "bg-purple-500" },
  { label: "Avg. Route Score", value: "88", unit: "/100", delta: "−1.2 vs target", up: false, color: "text-amber-400", bar: 88, barColor: "bg-amber-500" },
];

const FILTER_TABS = ["All", "Traffic", "Maintenance", "Optimization", "Weather"];

const AIInsightsPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? AI_INSIGHTS
    : AI_INSIGHTS.filter(i => i.type.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="h-full w-full flex flex-col gap-6 overflow-y-auto custom-scrollbar pb-6">

      {/* Page Header */}
      <div className="flex-shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-3">
            <span className="text-2xl">🧠</span>
            AI Insights
          </h1>
          <p className="text-xs text-slate-400 mt-1 pl-10">Real-time intelligence, predictive analytics & fleet recommendations</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">AI Engine Active</span>
        </div>
      </div>

      {/* KPI Metrics Row */}
      <div className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {METRICS.map((m, i) => (
          <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 shadow-lg hover:border-slate-700 transition-colors group">
            <div className="flex justify-between items-start">
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">{m.label}</p>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${m.up ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-amber-400 bg-amber-500/10 border-amber-500/20'}`}>
                {m.up ? '▲' : '▼'} {m.delta}
              </span>
            </div>
            <div className="flex items-end gap-1.5">
              <p className={`text-3xl font-bold leading-none ${m.color}`}>{m.value}</p>
              <p className="text-[10px] text-slate-500 pb-1">{m.unit}</p>
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${m.barColor} shadow-sm`} style={{ width: `${m.bar}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content: Insights Feed + Summary Panel */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Insights Feed — 2 cols */}
        <div className="xl:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Live Intelligence Feed</h2>
            <div className="flex gap-1.5 flex-wrap">
              {FILTER_TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border
                    ${activeFilter === tab
                      ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.3)]'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-slate-200'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {filtered.length > 0 ? filtered.map((insight, i) => (
              <InsightCard key={i} insight={insight} />
            )) : (
              <div className="flex flex-col items-center justify-center py-16 text-slate-600">
                <span className="text-4xl mb-3">🔍</span>
                <p className="text-sm font-bold text-slate-500">No insights for this category</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Summary Panel — 1 col */}
        <div className="flex flex-col gap-5">

          {/* AI Engine Status */}
          <div className="bg-gradient-to-br from-slate-900/90 to-slate-950 border border-blue-500/30 rounded-xl p-5 shadow-[0_0_20px_rgba(59,130,246,0.08)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/10 blur-3xl rounded-full pointer-events-none"></div>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
              </svg>
              AI Engine Status
            </h3>
            <div className="space-y-3 relative z-10">
              {[
                { label: "Model", value: "NAVIX Routing v2.1" },
                { label: "Mode", value: "Real-time Inference" },
                { label: "Avg Response", value: "84ms" },
                { label: "Active Models", value: "3 running" },
                { label: "Last Sync", value: "14 sec ago" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-slate-800/80 pb-2 last:border-0 last:pb-0">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{item.label}</span>
                  <span className="text-[11px] font-bold text-slate-200">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Optimization Summary */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col gap-4">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Weekly Optimization
            </h3>
            {/* Bar Chart mockup */}
            <div className="flex items-end gap-2 h-24">
              {[60, 75, 55, 90, 80, 95, 70].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-md bg-blue-500/60 hover:bg-blue-500 transition-colors cursor-pointer shadow-[0_0_6px_rgba(59,130,246,0.3)]"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[8px] text-slate-600 uppercase font-bold">
                    {['M','T','W','T','F','S','S'][i]}
                  </span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-800">
              <div>
                <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Routes Optimized</p>
                <p className="text-lg font-bold text-blue-400 leading-tight mt-0.5">312</p>
              </div>
              <div>
                <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">CO₂ Saved</p>
                <p className="text-lg font-bold text-emerald-400 leading-tight mt-0.5">94 kg</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AIInsightsPage;
