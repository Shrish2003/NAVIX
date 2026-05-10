import React from 'react';

const OptimizationCard = ({ title, value, subtitle, glowColor = "blue", icon }) => {
  const colorMap = {
    blue: 'from-blue-600/20 to-blue-900/20 border-blue-500/30 text-blue-400 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]',
    emerald: 'from-emerald-600/20 to-emerald-900/20 border-emerald-500/30 text-emerald-400 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]',
    purple: 'from-purple-600/20 to-purple-900/20 border-purple-500/30 text-purple-400 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]',
    amber: 'from-amber-600/20 to-amber-900/20 border-amber-500/30 text-amber-400 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]',
    cyan: 'from-cyan-600/20 to-cyan-900/20 border-cyan-500/30 text-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]',
    rose: 'from-rose-600/20 to-rose-900/20 border-rose-500/30 text-rose-400 group-hover:shadow-[0_0_15px_rgba(244,63,94,0.2)]'
  };

  const selectedClasses = colorMap[glowColor] || colorMap.blue;
  // Extracting border and text classes dynamically for the wrapper
  const classParts = selectedClasses.split(' ');
  const borderClass = classParts.find(c => c.startsWith('border-'));
  const textClass = classParts.find(c => c.startsWith('text-'));

  return (
    <div className={`group relative bg-gradient-to-br ${selectedClasses} rounded-xl p-4 transition-all duration-300 hover:-translate-y-1`}>
      {/* Subtle hover background highlight */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none"></div>
      
      <div className="flex justify-between items-start mb-1.5 relative z-10">
        <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">{title}</p>
        {icon && <div className={`${textClass} opacity-80`}>{icon}</div>}
      </div>
      
      <p className={`text-2xl font-bold ${textClass} relative z-10 drop-shadow-sm tracking-tight`}>
        {value}
      </p>
      
      {subtitle && (
        <p className="text-[10px] text-slate-500 mt-1.5 font-medium relative z-10">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default OptimizationCard;
