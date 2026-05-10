import React from 'react';

const STEPS = [
  { label: "Task Created",       time: "08:00 AM", status: "done",        icon: "📋" },
  { label: "Vehicle Assigned",   time: "08:05 AM", status: "done",        icon: "🚗" },
  { label: "Pickup Completed",   time: "09:40 AM", status: "done",        icon: "📦" },
  { label: "In Transit",         time: "09:45 AM", status: "in-progress", icon: "🛣️" },
  { label: "Checkpoint Cleared", time: "11:30 AM", status: "pending",     icon: "📍" },
  { label: "Delivered",          time: "14:30 PM", status: "pending",     icon: "✅" },
];

const DeliveryTimeline = () => (
  <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5 flex flex-col gap-5 shadow-lg h-full hover:border-slate-700 transition-colors group">
    <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
      <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
        <svg className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2" />
        </svg>
        Delivery Progress — Task #4498
      </h3>
      <span className="text-[9px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded uppercase tracking-wider">In Transit</span>
    </div>

    <div className="flex-1 relative pl-2">
      {/* Vertical line */}
      <div className="absolute top-4 bottom-4 left-[22px] w-0.5 bg-slate-800 rounded-full z-0"></div>

      <div className="space-y-5 relative z-10">
        {STEPS.map((step, i) => {
          const isDone = step.status === "done";
          const isActive = step.status === "in-progress";

          return (
            <div key={i} className="flex items-start gap-4">
              {/* Dot */}
              <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-base border-2 border-slate-950 shadow-md
                ${isDone   ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                : isActive ? "bg-blue-500 animate-pulse shadow-[0_0_12px_rgba(59,130,246,0.7)]"
                :            "bg-slate-800"}`}
              >
                {step.icon}
              </div>

              {/* Content */}
              <div className={`flex-1 py-2 px-3 rounded-lg border transition-colors
                ${isDone   ? "bg-emerald-500/5 border-emerald-500/20"
                : isActive ? "bg-blue-500/5 border-blue-500/30"
                :            "bg-slate-900/40 border-slate-800/60"}`}
              >
                <div className="flex justify-between items-center">
                  <p className={`text-xs font-bold
                    ${isDone ? "text-emerald-300" : isActive ? "text-blue-300" : "text-slate-500"}`}>
                    {step.label}
                  </p>
                  <span className="text-[9px] font-bold text-slate-500 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">{step.time}</span>
                </div>
                {isActive && (
                  <p className="text-[10px] text-blue-400/80 mt-0.5 font-medium">Vehicle currently en route — tracking active</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default DeliveryTimeline;
