import React from 'react';
import TaskCreationForm from '../components/tasks/TaskCreationForm';
import AIRecommendationPanel from '../components/tasks/AIRecommendationPanel';
import TaskQueue from '../components/tasks/TaskQueue';
import DispatcherFeed from '../components/tasks/DispatcherFeed';
import DeliveryTimeline from '../components/tasks/DeliveryTimeline';

// ── Stats Bar ──────────────────────────────────────────────────────────────
const STATS = [
  { label: "Pending Tasks",   value: 12, color: "text-slate-300",   dot: "bg-slate-500",   glow: "" },
  { label: "Assigned",        value: 4,  color: "text-blue-400",    dot: "bg-blue-500",    glow: "shadow-[0_0_8px_rgba(59,130,246,0.8)]" },
  { label: "In Progress",     value: 89, color: "text-emerald-400", dot: "bg-emerald-500", glow: "shadow-[0_0_8px_rgba(16,185,129,0.8)]" },
  { label: "Completed Today", value: 34, color: "text-purple-400",  dot: "bg-purple-500",  glow: "shadow-[0_0_8px_rgba(168,85,247,0.8)]" },
];

// ── Task Center Page ───────────────────────────────────────────────────────
const TaskCenterPage = () => {
  return (
    <div className="h-full w-full flex flex-col gap-5 overflow-y-auto custom-scrollbar pb-6">

      {/* ── Page Header ── */}
      <div className="flex-shrink-0 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-3">
            <span className="text-2xl">📋</span>
            Task Center
          </h1>
          <p className="text-xs text-slate-400 mt-1 pl-10">
            Dispatcher workspace — assign, route and track all fleet tasks
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Dispatcher Active</span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Task
          </button>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="flex-shrink-0 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-xl px-5 py-4 flex items-center gap-4 shadow-lg hover:border-slate-700 transition-colors group">
            <div className={`w-3 h-3 rounded-full flex-shrink-0 ${s.dot} ${s.glow} group-hover:scale-125 transition-transform`}></div>
            <div>
              <p className={`text-2xl font-bold leading-none ${s.color}`}>{s.value}</p>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mt-1">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Row 1: Task Form | AI Panel | Task Queue ── */}
      <div
        className="flex-shrink-0 grid grid-cols-1 lg:grid-cols-12 gap-5"
        style={{ minHeight: "460px" }}
      >
        <div className="lg:col-span-5 h-full">
          <TaskCreationForm />
        </div>
        <div className="lg:col-span-3 h-full">
          <AIRecommendationPanel />
        </div>
        <div className="lg:col-span-4 h-full">
          <TaskQueue />
        </div>
      </div>

      {/* ── Row 2: Dispatcher Feed | Delivery Timeline ── */}
      <div
        className="flex-shrink-0 grid grid-cols-1 lg:grid-cols-2 gap-5"
        style={{ minHeight: "400px" }}
      >
        <DispatcherFeed />
        <DeliveryTimeline />
      </div>

    </div>
  );
};

export default TaskCenterPage;
