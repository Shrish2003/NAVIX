import React from 'react';

const KPIStatCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  colorClass = "text-white",
  hoverGlow = "hover:shadow-slate-500/20",
  loading = false,
  statusChip = null
}) => {
  if (loading) {
    return (
      <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800 animate-pulse flex flex-col justify-between h-full min-h-[130px]">
        <div className="flex justify-between items-start mb-2">
          <div className="h-4 bg-slate-800 rounded w-1/2"></div>
          <div className="h-7 w-7 bg-slate-800 rounded-md"></div>
        </div>
        <div className="mt-auto">
          <div className="h-8 bg-slate-800 rounded w-2/3 mb-2"></div>
          <div className="h-3 bg-slate-800 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`group relative bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl p-5 border border-slate-800/80 transition-all duration-300 transform hover:-translate-y-1 hover:border-slate-600 hover:shadow-xl ${hoverGlow} flex flex-col justify-between h-full min-h-[130px] overflow-hidden`}>
      {/* Subtle background glow effect */}
      <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl z-0 pointer-events-none"></div>
      
      <div className="relative z-10 flex justify-between items-start mb-3">
        <h3 className="text-xs font-semibold text-slate-400 tracking-wider uppercase">{title}</h3>
        {icon && (
          <div className="p-1.5 rounded-lg bg-slate-800/40 text-slate-400 border border-slate-700/50 group-hover:bg-slate-700/50 group-hover:text-slate-200 transition-colors shadow-inner">
            {icon}
          </div>
        )}
      </div>

      <div className="relative z-10 mt-auto">
        <div className="flex items-baseline gap-2 mb-1">
          {value !== null && value !== undefined && !statusChip && (
            <span className={`text-3xl font-bold tracking-tight drop-shadow-sm ${colorClass}`}>
              {value}
            </span>
          )}
          {statusChip && (
            <div className="mt-1">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide bg-lime-500/10 text-lime-400 border border-lime-500/20 shadow-[0_0_10px_rgba(132,204,22,0.1)]">
                <span className="w-1.5 h-1.5 bg-lime-400 rounded-full mr-2 animate-pulse shadow-[0_0_5px_rgba(132,204,22,0.8)]"></span>
                {statusChip}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-2">
          {subtitle && <p className="text-xs text-slate-500 font-medium">{subtitle}</p>}
          
          {trend && (
            <div className={`flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded ${
              trend.isPositive ? 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20' : 'text-rose-400 bg-rose-400/10 border border-rose-400/20'
            }`}>
              {trend.isPositive ? (
                <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              ) : (
                <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
                </svg>
              )}
              {trend.value}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KPIStatCard;
