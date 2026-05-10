import React from 'react';
import VehicleRow from './VehicleRow';
import VehicleCard from './VehicleCard';

const VehicleTable = ({ vehicles = [], selectedId, onSelect, viewMode = 'list', isLoading = false }) => {
  const data = vehicles;

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-900/50 border border-slate-800 rounded-xl">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
          <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Loading Fleet Data...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-900/50 border border-slate-800 rounded-xl shadow-inner">
        <div className="flex flex-col items-center text-center p-8">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 border border-slate-700">
            <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-300 mb-1">No Vehicles Found</h3>
          <p className="text-sm text-slate-500 max-w-[250px]">Try adjusting your search or filter criteria.</p>
        </div>
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {data.map((v, i) => (
            <VehicleCard 
              key={i} 
              vehicle={v} 
              isSelected={selectedId === v.vehicle_id} 
              onSelect={onSelect} 
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex-1 flex flex-col relative group">
      <div className="overflow-auto flex-1 relative z-10 custom-scrollbar">
        <table className="w-full text-left text-sm text-slate-400 whitespace-nowrap">
          <thead className="text-[10px] uppercase tracking-wider bg-slate-900/90 border-b border-slate-800 sticky top-0 z-20 backdrop-blur-md">
            <tr>
              <th className="px-4 py-3.5 font-bold text-slate-300 w-1"></th>
              <th className="px-4 py-3.5 font-bold text-slate-300">Vehicle ID</th>
              <th className="px-4 py-3.5 font-bold text-slate-300">Status</th>
              <th className="px-4 py-3.5 font-bold text-slate-300">Current Route</th>
              <th className="px-4 py-3.5 font-bold text-slate-300">Speed</th>
              <th className="px-4 py-3.5 font-bold text-slate-300">Fuel Level</th>
              <th className="px-4 py-3.5 font-bold text-right text-slate-300">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {data.map((v, i) => (
              <VehicleRow 
                key={i} 
                vehicle={v} 
                isSelected={selectedId === v.vehicle_id} 
                onSelect={onSelect} 
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleTable;
