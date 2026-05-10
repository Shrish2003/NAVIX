import React from 'react';
import ActiveTasksWidget from './ActiveTasksWidget';
import FleetHealthWidget from './FleetHealthWidget';
import MiniFleetMap from './MiniFleetMap';

const OperationsPanel = ({ vehicles }) => {
  return (
    <div className="h-full flex flex-col gap-5 overflow-y-auto custom-scrollbar p-2">
      {/* Top Row: Mini Map and Fleet Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-[280px] flex-shrink-0">
        <MiniFleetMap vehicles={vehicles} />
        <FleetHealthWidget vehicles={vehicles} />
      </div>

      {/* Bottom Row: Active Tasks and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 flex-1 min-h-[350px]">
        <ActiveTasksWidget />
        
        {/* Alerts Panel inline */}
        <div className="bg-slate-950/50 border border-slate-800 rounded-xl flex flex-col shadow-lg overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
             <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.8)]"></span>
                System Alerts
             </h3>
             <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 text-[10px] border border-rose-500/20 font-bold tracking-wider shadow-[0_0_8px_rgba(244,63,94,0.15)]">3 Active</span>
          </div>
          <div className="flex-1 p-4 space-y-3 overflow-y-auto custom-scrollbar">
             <div className="bg-slate-900/40 border border-slate-800/80 rounded-lg p-3 hover:bg-slate-800/50 transition-colors cursor-pointer border-l-2 border-l-rose-500 hover:border-r-rose-500/30">
               <div className="flex justify-between items-start mb-1">
                 <p className="text-xs font-bold text-slate-200">Vehicle V-103 Offline</p>
                 <span className="text-[8px] text-slate-500 uppercase tracking-widest">15m ago</span>
               </div>
               <p className="text-[10px] text-slate-500">Telemetry connection lost in Sector 4. Last known status: Maintenance.</p>
             </div>
             
             <div className="bg-slate-900/40 border border-slate-800/80 rounded-lg p-3 hover:bg-slate-800/50 transition-colors cursor-pointer border-l-2 border-l-amber-500 hover:border-r-amber-500/30">
               <div className="flex justify-between items-start mb-1">
                 <p className="text-xs font-bold text-slate-200">Traffic Delay Detected</p>
                 <span className="text-[8px] text-slate-500 uppercase tracking-widest">32m ago</span>
               </div>
               <p className="text-[10px] text-slate-500">Route 44 North facing 20 min delay due to heavy congestion.</p>
             </div>
             
             <div className="bg-slate-900/40 border border-slate-800/80 rounded-lg p-3 hover:bg-slate-800/50 transition-colors cursor-pointer border-l-2 border-l-blue-500 hover:border-r-blue-500/30">
               <div className="flex justify-between items-start mb-1">
                 <p className="text-xs font-bold text-slate-200">Maintenance Reminder</p>
                 <span className="text-[8px] text-slate-500 uppercase tracking-widest">2h ago</span>
               </div>
               <p className="text-[10px] text-slate-500">V-102 is scheduled for routine service bay inspection tomorrow at 08:00 AM.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OperationsPanel;
