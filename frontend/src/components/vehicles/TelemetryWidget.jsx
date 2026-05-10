import React from 'react';

const TelemetryWidget = ({ title, value, unit, icon, colorClass = "blue" }) => {
  const colorMap = {
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
  };
  
  const styling = colorMap[colorClass] || colorMap.blue;

  return (
    <div className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-3 shadow-inner flex flex-col justify-between group hover:border-slate-700 transition-colors">
      <div className="flex justify-between items-center mb-2">
        <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold group-hover:text-slate-400 transition-colors">{title}</p>
        <div className={`p-1.5 rounded-md border transition-colors ${styling}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-end gap-1 mt-1">
        <p className="text-xl font-bold text-slate-200 leading-none">{value}</p>
        {unit && <span className="text-[10px] text-slate-500 font-normal uppercase tracking-widest mb-0.5">{unit}</span>}
      </div>
    </div>
  );
};

export default TelemetryWidget;
