import React from 'react';

const AI_INSIGHTS = [
  {
    type: "warning",
    icon: "⚠️",
    title: "Traffic Delay Predicted",
    description: "Route R-103 via Highway 44 North is likely to face a 12–18 minute delay due to heavy congestion near Sitabuldi Junction.",
    impact: "+16 min ETA",
    impactColor: "text-amber-400",
    confidence: 91,
    vehicle: "V-105",
    time: "Just now",
    color: "border-amber-500/40 bg-amber-500/5",
    glowColor: "shadow-[0_0_15px_rgba(245,158,11,0.1)]",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  {
    type: "optimization",
    icon: "⚡",
    title: "Route Re-Optimization Available",
    description: "Vehicle V-101 can save 4.5L fuel by switching to the alternate Wardha bypass. Estimated time delta is only +3 minutes.",
    impact: "−₹620 Cost",
    impactColor: "text-emerald-400",
    confidence: 96,
    vehicle: "V-101",
    time: "2 min ago",
    color: "border-emerald-500/40 bg-emerald-500/5",
    glowColor: "shadow-[0_0_15px_rgba(16,185,129,0.1)]",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    type: "maintenance",
    icon: "🔧",
    title: "Predictive Maintenance Alert",
    description: "Vehicle V-103 telemetry indicates abnormal engine load patterns. Scheduled maintenance recommended within 48 hours.",
    impact: "High Risk",
    impactColor: "text-rose-400",
    confidence: 84,
    vehicle: "V-103",
    time: "18 min ago",
    color: "border-rose-500/40 bg-rose-500/5",
    glowColor: "shadow-[0_0_15px_rgba(244,63,94,0.1)]",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  },
  {
    type: "info",
    icon: "🌦️",
    title: "Weather Impact Advisory",
    description: "Light rainfall expected near Pune sector between 16:00–18:00. Routes passing through NH-48 may see minor delays.",
    impact: "Low Impact",
    impactColor: "text-blue-400",
    confidence: 78,
    vehicle: "All Routes",
    time: "1 hr ago",
    color: "border-blue-500/40 bg-blue-500/5",
    glowColor: "shadow-[0_0_15px_rgba(59,130,246,0.1)]",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
];

const InsightCard = ({ insight }) => (
  <div className={`rounded-xl border p-5 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-500 cursor-default ${insight.color} ${insight.glowColor}`}>
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <span className="text-xl flex-shrink-0 mt-0.5">{insight.icon}</span>
        <div>
          <p className="text-sm font-bold text-slate-200 leading-tight">{insight.title}</p>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">{insight.vehicle} · {insight.time}</p>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className={`text-sm font-bold ${insight.impactColor}`}>{insight.impact}</p>
        <span className={`text-[8px] px-1.5 py-0.5 rounded border uppercase font-bold tracking-wider ${insight.badgeColor}`}>{insight.type}</span>
      </div>
    </div>
    
    <p className="text-xs text-slate-400 leading-relaxed pl-8">{insight.description}</p>
    
    <div className="pl-8 flex items-center justify-between">
      <div className="flex-1 mr-4">
        <div className="flex justify-between text-[9px] text-slate-500 mb-1 uppercase tracking-widest font-bold">
          <span>AI Confidence</span>
          <span className="text-slate-300">{insight.confidence}%</span>
        </div>
        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all ${insight.confidence > 90 ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]' : insight.confidence > 75 ? 'bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.6)]' : 'bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.6)]'}`}
            style={{ width: `${insight.confidence}%` }}
          />
        </div>
      </div>
      <button className="text-[10px] font-bold text-blue-400 hover:text-blue-300 uppercase tracking-wider transition-colors flex items-center gap-1 group">
        Apply
        <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  </div>
);

export default InsightCard;
export { AI_INSIGHTS };
