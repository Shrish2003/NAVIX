import React from 'react';

const TaskForm = () => {
  return (
    <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col h-full group hover:border-slate-700 transition-colors">
      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        New Dispatch Task
      </h3>
      
      <div className="space-y-4 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-1.5">Pickup Location</label>
            <input type="text" placeholder="Enter origin..." className="w-full bg-slate-900 border border-slate-700 text-sm text-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition-colors shadow-inner" />
          </div>
          <div>
            <label className="block text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-1.5">Destination</label>
            <input type="text" placeholder="Enter destination..." className="w-full bg-slate-900 border border-slate-700 text-sm text-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition-colors shadow-inner" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-1.5">Delivery Priority</label>
            <select className="w-full bg-slate-900 border border-slate-700 text-sm text-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition-colors shadow-inner appearance-none cursor-pointer">
              <option value="standard">Standard</option>
              <option value="high">High Priority</option>
              <option value="express">Express</option>
              <option value="critical">Critical (Immediate)</option>
            </select>
          </div>
          <div>
            <label className="block text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-1.5">Required ETA</label>
            <input type="datetime-local" className="w-full bg-slate-900 border border-slate-700 text-sm text-slate-400 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition-colors shadow-inner" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
          <div>
            <label className="block text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-1.5">Assigned Vehicle</label>
            <select className="w-full bg-slate-900 border border-slate-700 text-sm text-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition-colors shadow-inner appearance-none cursor-pointer">
              <option value="">Auto-Assign (AI Recommended)</option>
              <option value="V-101">V-101 (Active)</option>
              <option value="V-102">V-102 (Idle)</option>
              <option value="V-105">V-105 (Active)</option>
            </select>
          </div>
          <div>
            <label className="block text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-1.5">Assigned Driver</label>
            <select className="w-full bg-slate-900 border border-slate-700 text-sm text-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition-colors shadow-inner appearance-none cursor-pointer">
              <option value="">Auto-Assign</option>
              <option value="d1">James Miller</option>
              <option value="d2">Sarah Jenkins</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-800/50 flex flex-wrap gap-3">
        <button className="flex-1 min-w-[120px] bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] flex items-center justify-center gap-2">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Assign Task
        </button>
        <button className="flex-1 min-w-[120px] bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg transition-all shadow-sm flex items-center justify-center gap-2">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Gen Route
        </button>
        <button className="flex-1 min-w-[120px] bg-emerald-600/20 border border-emerald-500/50 hover:bg-emerald-600/30 text-emerald-400 text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)] flex items-center justify-center gap-2">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Optimize
        </button>
      </div>
    </div>
  );
};
export default TaskForm;
