import React from 'react';

const RouteTimeline = ({ route }) => {
  const checkpoints = route?.checkpoints || [
    { location: "Nagpur Hub", time: "08:00 AM", status: "completed", type: "origin" },
    { location: "Sector 4 Checkpoint", time: "09:30 AM", status: "completed", type: "transit" },
    { location: "Highway 44 Toll", time: "11:45 AM", status: "in-progress", type: "transit" },
    { location: "Mumbai Depot", time: "14:30 PM", status: "pending", type: "destination" },
  ];

  return (
    <div className="relative pl-3 space-y-6">
      {/* Vertical connecting line */}
      <div className="absolute top-3 bottom-3 left-[17px] w-0.5 bg-slate-800"></div>
      
      {checkpoints.map((cp, idx) => {
        let colorClass = "bg-slate-800/40 border-slate-700/80";
        let dotColor = "bg-slate-600";
        let textClass = "text-slate-500";
        
        if (cp.status === "completed") {
          colorClass = "bg-emerald-500/10 border-emerald-500/30";
          dotColor = "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]";
          textClass = "text-emerald-400";
        } else if (cp.status === "in-progress") {
          colorClass = "bg-blue-500/10 border-blue-500/30";
          dotColor = "bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]";
          textClass = "text-blue-400";
        }

        return (
          <div key={idx} className="relative z-10 flex items-start gap-4 group cursor-default">
            <div className={`mt-1.5 w-3.5 h-3.5 rounded-full border-2 border-slate-950 flex-shrink-0 transition-colors ${dotColor}`}></div>
            <div className={`flex-1 p-3 rounded-lg border transition-colors hover:border-slate-500 ${colorClass}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-xs font-bold ${textClass}`}>{cp.location}</p>
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-0.5 font-medium">{cp.type}</p>
                </div>
                <span className="text-[10px] text-slate-400 font-bold bg-slate-950/80 px-2 py-0.5 rounded shadow-sm border border-slate-800/80">{cp.time}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default RouteTimeline;
