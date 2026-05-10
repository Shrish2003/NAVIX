import React, { useState } from 'react';

const PRIORITIES = [
  { value: "standard", label: "Standard", color: "text-slate-400" },
  { value: "high",     label: "High Priority", color: "text-blue-400" },
  { value: "express",  label: "Express", color: "text-amber-400" },
  { value: "critical", label: "Critical — Immediate", color: "text-rose-400" },
];

const VEHICLES = ["Auto-Assign (AI)", "V-101 (Active)", "V-102 (Idle)", "V-105 (Active)"];
const DRIVERS  = ["Auto-Assign", "James Miller", "Sarah Jenkins", "Ravi Sharma"];

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">{label}</label>
    {children}
  </div>
);

const inputCls = "w-full bg-slate-900 border border-slate-700 text-sm text-slate-200 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 hover:border-slate-600 transition-colors shadow-inner placeholder-slate-600";
const selectCls = `${inputCls} appearance-none cursor-pointer`;

const TaskCreationForm = () => {
  const [priority, setPriority] = useState("standard");

  return (
    <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5 flex flex-col gap-5 shadow-lg h-full hover:border-slate-700 transition-colors group">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          New Dispatch Task
        </h3>
        <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase tracking-wider">Dispatcher Mode</span>
      </div>

      {/* Route */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Pickup Location">
          <input type="text" placeholder="e.g. Nagpur Hub, Sector 4..." className={inputCls} />
        </Field>
        <Field label="Destination">
          <input type="text" placeholder="e.g. Mumbai Dock, Delhi Depot..." className={inputCls} />
        </Field>
      </div>

      {/* Priority selector */}
      <Field label="Delivery Priority">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PRIORITIES.map(p => (
            <button
              key={p.value}
              onClick={() => setPriority(p.value)}
              className={`py-2 px-2 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all
                ${priority === p.value
                  ? 'bg-blue-600/30 border-blue-500 text-blue-300 shadow-[0_0_10px_rgba(37,99,235,0.2)]'
                  : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-600 hover:text-slate-300'}`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </Field>

      {/* ETA */}
      <Field label="Required ETA">
        <input type="datetime-local" className={`${inputCls} text-slate-400`} />
      </Field>

      {/* Assign */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-800/60">
        <Field label="Assign Vehicle">
          <select className={selectCls}>
            {VEHICLES.map(v => <option key={v}>{v}</option>)}
          </select>
        </Field>
        <Field label="Assign Driver">
          <select className={selectCls}>
            {DRIVERS.map(d => <option key={d}>{d}</option>)}
          </select>
        </Field>
      </div>

      {/* Notes */}
      <Field label="Dispatch Notes (Optional)">
        <textarea rows={2} placeholder="Special instructions, load details..." className={`${inputCls} resize-none leading-relaxed`} />
      </Field>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pt-3 border-t border-slate-800/60 mt-auto">
        <button className="flex-1 min-w-[110px] bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] flex items-center justify-center gap-2">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Assign Task
        </button>
        <button className="flex-1 min-w-[110px] bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Gen Route
        </button>
        <button className="flex-1 min-w-[110px] bg-emerald-600/20 border border-emerald-500/40 hover:bg-emerald-600/30 text-emerald-400 text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl transition-all shadow-[0_0_10px_rgba(16,185,129,0.1)] flex items-center justify-center gap-2">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Optimize
        </button>
      </div>
    </div>
  );
};

export default TaskCreationForm;
