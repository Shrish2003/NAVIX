import React from 'react';

const FEED = [
  { icon: "📦", type: "Assignment", text: "Load #4498 assigned to V-105 via AI recommendation", time: "Just now", color: "border-l-blue-500" },
  { icon: "🔄", type: "Reroute",    text: "Route R-103 rerouted due to traffic on NH-44 North", time: "3 min ago", color: "border-l-amber-500" },
  { icon: "✅", type: "Delivery",   text: "Load #4490 delivered successfully at Mumbai Dock", time: "18 min ago", color: "border-l-emerald-500" },
  { icon: "⚠️", type: "Delay",      text: "V-104 reporting 20-min delay on Urban Sector 7 route", time: "25 min ago", color: "border-l-rose-500" },
  { icon: "⚡", type: "AI Action",  text: "NAVIX AI optimized 3 routes — est. ₹4,200 cost saved", time: "41 min ago", color: "border-l-purple-500" },
  { icon: "🔧", type: "Alert",      text: "V-103 flagged for predictive maintenance check", time: "1 hr ago", color: "border-l-amber-500" },
];

const TYPE_BADGE = {
  "Assignment": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Reroute":    "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Delivery":   "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Delay":      "bg-rose-500/10 text-rose-400 border-rose-500/20",
  "AI Action":  "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Alert":      "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const DispatcherFeed = () => (
  <div className="bg-slate-950/50 border border-slate-800 rounded-xl flex flex-col shadow-lg overflow-hidden h-full hover:border-slate-700 transition-colors group">
    <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center flex-shrink-0">
      <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
        Dispatcher Activity Feed
      </h3>
      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Live</span>
    </div>
    <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-slate-800/40">
      {FEED.map((item, i) => (
        <div key={i} className={`flex items-start gap-3 px-4 py-3.5 border-l-2 ${item.color} hover:bg-slate-800/30 transition-colors cursor-default`}>
          <span className="text-base flex-shrink-0 mt-0.5">{item.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[8px] px-1.5 py-0.5 rounded border uppercase font-bold tracking-wider ${TYPE_BADGE[item.type] || "bg-slate-500/10 text-slate-400 border-slate-500/20"}`}>
                {item.type}
              </span>
              <span className="text-[9px] text-slate-600 font-bold">{item.time}</span>
            </div>
            <p className="text-xs text-slate-300 leading-snug">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default DispatcherFeed;
