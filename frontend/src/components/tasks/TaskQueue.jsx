import React, { useState } from 'react';

const TASKS = [
  { id: "T-8991", dest: "Sector 4 Hub → Mumbai",      status: "in-progress", vehicle: "V-101", priority: "high",     time: "10:30" },
  { id: "T-8992", dest: "Nagpur Central → Delhi",      status: "assigned",    vehicle: "V-105", priority: "express",  time: "11:15" },
  { id: "T-8993", dest: "Mumbai Dock → Pune",          status: "pending",     vehicle: "Unassigned", priority: "standard", time: "-" },
  { id: "T-8994", dest: "Highway 44 → Nagpur Hub",     status: "completed",   vehicle: "V-102", priority: "standard", time: "09:00" },
  { id: "T-8995", dest: "Wardha Depot → Akola",        status: "pending",     vehicle: "Unassigned", priority: "critical", time: "-" },
];

const STATUS_TABS = ["All", "Pending", "Assigned", "In Progress", "Completed"];

const STATUS_STYLE = {
  "in-progress": "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  "assigned":    "bg-blue-500/10 text-blue-400 border-blue-500/30",
  "pending":     "bg-slate-500/10 text-slate-400 border-slate-500/30",
  "completed":   "bg-purple-500/10 text-purple-400 border-purple-500/30",
};

const PRIORITY_STYLE = {
  "critical": "text-rose-400",
  "express":  "text-amber-400",
  "high":     "text-blue-400",
  "standard": "text-slate-500",
};

const TaskQueue = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = activeTab === "All"
    ? TASKS
    : TASKS.filter(t => t.status.replace("-", " ") === activeTab.toLowerCase() || t.status === activeTab.toLowerCase().replace(" ", "-"));

  return (
    <div className="bg-slate-950/50 border border-slate-800 rounded-xl flex flex-col shadow-lg overflow-hidden h-full hover:border-slate-700 transition-colors group">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center flex-shrink-0">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
          <svg className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          Active Task Queue
        </h3>
        <div className="flex gap-1.5">
          {["12", "4", "89", "342"].map((n, i) => (
            <span key={i} className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider
              ${i===0 ? "text-slate-400 bg-slate-500/10 border-slate-500/20"
              : i===1 ? "text-blue-400 bg-blue-500/10 border-blue-500/20"
              : i===2 ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
              :         "text-purple-400 bg-purple-500/10 border-purple-500/20"}`}>{n}</span>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 px-4 py-2.5 border-b border-slate-800/60 flex-shrink-0 overflow-x-auto">
        {STATUS_TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider whitespace-nowrap transition-all
              ${activeTab === tab
                ? "bg-blue-600/30 text-blue-300 border border-blue-500/40"
                : "text-slate-500 hover:text-slate-300 border border-transparent hover:border-slate-700"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-600 py-8">
            <span className="text-3xl mb-2">📭</span>
            <p className="text-xs">No tasks in this category</p>
          </div>
        ) : filtered.map((task, i) => (
          <div key={i} className="flex justify-between items-center bg-slate-900/50 p-3 rounded-xl border border-slate-800/60 hover:border-slate-600 hover:bg-slate-800/40 transition-all cursor-pointer group/item">
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-200">{task.id}</span>
                <span className={`text-[8px] font-bold uppercase tracking-wider ${PRIORITY_STYLE[task.priority]}`}>● {task.priority}</span>
              </div>
              <span className="text-[10px] text-slate-500 truncate">{task.dest}</span>
            </div>
            <div className="flex flex-col items-end gap-1.5 flex-shrink-0 ml-2">
              <span className={`text-[8px] px-1.5 py-0.5 rounded border uppercase font-bold tracking-wider ${STATUS_STYLE[task.status]}`}>{task.status.replace("-", " ")}</span>
              <span className="text-[9px] text-slate-500 flex items-center gap-1">
                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                {task.vehicle}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-slate-800/60 flex-shrink-0">
        <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors border border-slate-700 flex items-center justify-center gap-2">
          View All Tasks
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskQueue;
