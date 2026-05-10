import React from 'react';

const VehicleStatusBadge = ({ status }) => {
  const normStatus = (status || 'offline').toLowerCase();
  
  const styles = {
    active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.15)]',
    idle: 'bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_8px_rgba(59,130,246,0.15)]',
    delayed: 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_8px_rgba(245,158,11,0.15)]',
    maintenance: 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_8px_rgba(244,63,94,0.15)]',
    offline: 'bg-slate-500/10 text-slate-400 border-slate-500/20 shadow-[0_0_8px_rgba(100,116,139,0.15)]'
  };

  const style = styles[normStatus] || styles.offline;

  return (
    <span className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider border ${style}`}>
      {normStatus}
    </span>
  );
};

export default VehicleStatusBadge;
