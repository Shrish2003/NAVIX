import React, { useState, useEffect } from "react";
import KPISection from "../components/KPISection";
import OptimizationPanel from "../components/OptimizationPanel";
import OperationsPanel from "../components/OperationsPanel";
import { getVehicles, getOptimization } from "../services/api";

// ── Compact Recent Activity Panel ──────────────────────────────────────────
const RECENT_ACTIVITY = [
  { icon: "🟢", text: "V-101 entered active route on Nagpur–Mumbai HWY", time: "1 min ago" },
  { icon: "⚠️", text: "V-104 delayed — traffic detected on Urban Sector 7", time: "4 min ago" },
  { icon: "🔧", text: "V-103 moved to maintenance queue", time: "18 min ago" },
  { icon: "✅", text: "Load #4490 delivered successfully at Mumbai Dock", time: "32 min ago" },
  { icon: "⚡", text: "NAVIX AI re-optimized 3 routes — saving est. 9.2L fuel", time: "45 min ago" },
];

const RecentActivityPanel = () => (
  <div className="bg-slate-950/50 border border-slate-800 rounded-xl flex flex-col shadow-lg overflow-hidden hover:border-slate-700 transition-colors group h-full">
    <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
      <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
        <svg className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Recent Activity
      </h3>
      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Live Feed</span>
    </div>
    <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-slate-800/60">
      {RECENT_ACTIVITY.map((item, i) => (
        <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-800/30 transition-colors cursor-default">
          <span className="text-base flex-shrink-0 mt-0.5">{item.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-300 leading-snug">{item.text}</p>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-0.5 font-bold">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── Compact AI Recommendation Preview ─────────────────────────────────────
const AIQuickInsight = () => (
  <div className="bg-gradient-to-br from-slate-900/90 to-slate-950 border border-blue-500/30 rounded-xl p-5 shadow-[0_0_20px_rgba(59,130,246,0.08)] relative overflow-hidden h-full flex flex-col group">
    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-500"></div>
    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10">
      <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      AI Quick Insight
    </h3>
    <div className="flex-1 space-y-3 relative z-10">
      <p className="text-xs text-slate-200 leading-relaxed">
        Traffic near <span className="text-amber-400 font-bold">Sitabuldi Junction</span> may add
        <span className="text-amber-400 font-bold"> +8 min</span> to active routes. Consider alternate bypass.
      </p>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-slate-950/60 border border-slate-800/60 rounded-lg p-2.5 text-center">
          <p className="text-[8px] text-slate-500 uppercase tracking-widest font-bold mb-1">Routes at Risk</p>
          <p className="text-lg font-bold text-amber-400 leading-none">2</p>
        </div>
        <div className="bg-slate-950/60 border border-slate-800/60 rounded-lg p-2.5 text-center">
          <p className="text-[8px] text-slate-500 uppercase tracking-widest font-bold mb-1">AI Confidence</p>
          <p className="text-lg font-bold text-blue-400 leading-none">91<span className="text-xs">%</span></p>
        </div>
      </div>
    </div>
    <a className="mt-4 pt-3 border-t border-slate-800/60 text-[10px] text-blue-400 hover:text-blue-300 font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer group/lnk relative z-10">
      View All Insights
      <svg className="w-3 h-3 transform group-hover/lnk:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </a>
  </div>
);

// ── Compact Fleet Status Summary ───────────────────────────────────────────
const FleetStatusSummary = ({ vehicles }) => {
  const total  = vehicles.length || 124;
  const active = vehicles.filter(v => v.status === "active").length || 89;
  const idle   = vehicles.filter(v => v.status === "idle").length   || 18;
  const maint  = vehicles.filter(v => v.status === "maintenance").length || 5;
  const offline= vehicles.filter(v => v.status === "offline").length    || 12;

  const items = [
    { label: "Active",      value: active,  color: "text-emerald-400", bar: "bg-emerald-500", pct: Math.round((active  / total) * 100) },
    { label: "Idle",        value: idle,    color: "text-blue-400",    bar: "bg-blue-500",    pct: Math.round((idle    / total) * 100) },
    { label: "Maintenance", value: maint,   color: "text-amber-400",   bar: "bg-amber-500",   pct: Math.round((maint   / total) * 100) },
    { label: "Offline",     value: offline, color: "text-slate-400",   bar: "bg-slate-600",   pct: Math.round((offline / total) * 100) },
  ];

  return (
    <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5 flex flex-col gap-4 shadow-lg hover:border-slate-700 transition-colors h-full group">
      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
        <svg className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Fleet Status Breakdown
      </h3>
      <div className="flex items-center justify-between">
        <p className="text-3xl font-bold text-white">{total}</p>
        <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Total Vehicles</p>
      </div>
      <div className="flex gap-1 h-2 w-full rounded-full overflow-hidden">
        {items.map((it, i) => (
          <div key={i} title={it.label} className={`${it.bar} h-full transition-all`} style={{ width: `${it.pct}%` }} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 pt-1">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${it.bar} flex-shrink-0`}></div>
            <div>
              <p className={`text-sm font-bold leading-none ${it.color}`}>{it.value}</p>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">{it.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Dashboard Page ─────────────────────────────────────────────────────────
const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [optimization, setOptimization] = useState(null);
  const [loadingOptimization, setLoadingOptimization] = useState(false);

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        const vehiclesData = await getVehicles();
        if (!mounted) return;
        setVehicles(vehiclesData || []);
      } catch {
        if (mounted) setVehicles([]);
      }
    };
    loadData();
    const interval = setInterval(loadData, 2000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  useEffect(() => {
    let mounted = true;
    const loadOptimization = async () => {
      setLoadingOptimization(true);
      try {
        const result = await getOptimization();
        if (!mounted) return;
        setOptimization(result);
      } catch {
        // silent fail
      } finally {
        if (mounted) setLoadingOptimization(false);
      }
    };
    loadOptimization();
    const optInterval = setInterval(loadOptimization, 5000);
    return () => { mounted = false; clearInterval(optInterval); };
  }, []);

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden">

      {/* KPI Row */}
      <div className="flex-shrink-0">
        <KPISection vehicles={vehicles} />
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-5 pr-1 pb-4">

        {/* Row 1: Operations (2 cols) + Optimization Panel (1 col) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 flex-shrink-0" style={{ minHeight: "340px" }}>
          <div className="col-span-1 lg:col-span-2 overflow-hidden rounded-xl border border-slate-700 bg-slate-900/30 shadow-lg shadow-black/10">
            <OperationsPanel vehicles={vehicles} />
          </div>
          <div className="col-span-1 overflow-hidden rounded-xl border border-slate-700 bg-slate-950 shadow-lg shadow-black/10">
            <OptimizationPanel optimization={optimization} isLoading={loadingOptimization} />
          </div>
        </div>

        {/* Row 2: Fleet Status (1 col) + AI Quick Insight (1 col) + Recent Activity (2 cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 flex-shrink-0" style={{ minHeight: "260px" }}>
          <div className="sm:col-span-1">
            <FleetStatusSummary vehicles={vehicles} />
          </div>
          <div className="sm:col-span-1">
            <AIQuickInsight />
          </div>
          <div className="sm:col-span-2">
            <RecentActivityPanel />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
