import React from 'react';

const RouteTable = ({ activeRouteId, onRouteSelect }) => {
  const routes = [
    { id: "R-101", vehicle: "V-101", from: "Nagpur Hub", to: "Mumbai Dock", status: "optimized", eta: "14:30", dist: "840 km", score: 96 },
    { id: "R-102", vehicle: "V-102", from: "Nagpur South", to: "Sector 7", status: "rerouting", eta: "11:15", dist: "45 km", score: 72 },
    { id: "R-103", vehicle: "V-105", from: "Highway 44", to: "Delhi Depot", status: "delayed", eta: "16:45", dist: "1,120 km", score: 68 },
    { id: "R-104", vehicle: "V-106", from: "Pune Central", to: "Nagpur Hub", status: "in-progress", eta: "09:00", dist: "710 km", score: 92 },
  ];

  const getStatusStyle = (status) => {
    const s = status.toLowerCase();
    if (s === 'optimized') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.15)]';
    if (s === 'rerouting') return 'bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_8px_rgba(168,85,247,0.15)]';
    if (s === 'delayed') return 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_8px_rgba(245,158,11,0.15)]';
    if (s === 'in-progress') return 'bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_8px_rgba(59,130,246,0.15)]';
    return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  };

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-xl overflow-hidden shadow-lg h-full flex flex-col group">
      <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex justify-between items-center relative z-10 backdrop-blur-sm">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          Active Routes
        </h3>
        <button className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded transition-colors border border-slate-700 shadow-sm flex items-center gap-1.5">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3 relative z-0">
        {routes.map((r, i) => {
          const isSelected = r.id === activeRouteId;
          return (
            <div 
              key={i} 
              onClick={() => onRouteSelect(r.id)}
              className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col gap-3 group/item hover:-translate-y-0.5
                ${isSelected 
                  ? 'bg-slate-800/80 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)] scale-[1.01]' 
                  : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-600'}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full transition-colors ${isSelected ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse' : 'bg-slate-600 group-hover/item:bg-slate-500'}`}></div>
                  <span className="text-xs font-bold text-slate-200">{r.id}</span>
                  <span className="text-[9px] font-bold text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 uppercase tracking-widest">{r.vehicle}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[8px] uppercase font-bold tracking-wider border transition-colors ${getStatusStyle(r.status)}`}>
                  {r.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 bg-slate-950/40 p-2 rounded-lg border border-slate-800/50">
                <div className="flex flex-col flex-1 truncate">
                  <span className="uppercase tracking-widest text-[8px] text-slate-500 mb-0.5">Origin</span>
                  <span className="text-slate-300 truncate pr-2">{r.from}</span>
                </div>
                <svg className="w-3.5 h-3.5 text-slate-600 mx-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <div className="flex flex-col text-right flex-1 truncate">
                  <span className="uppercase tracking-widest text-[8px] text-slate-500 mb-0.5">Destination</span>
                  <span className="text-slate-300 truncate pl-2">{r.to}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 mt-0.5">
                <div>
                  <p className="text-[8px] uppercase tracking-widest text-slate-500">ETA</p>
                  <p className="text-[11px] font-bold text-blue-400 leading-tight">{r.eta}</p>
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-widest text-slate-500">Distance</p>
                  <p className="text-[11px] font-bold text-slate-300 leading-tight">{r.dist}</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] uppercase tracking-widest text-slate-500">Opt Score</p>
                  <p className="text-[11px] font-bold text-emerald-400 leading-tight">{r.score}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default RouteTable;
