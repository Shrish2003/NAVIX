import React from 'react';
import VehicleOverviewCard from './VehicleOverviewCard';
import TelemetryWidget from './TelemetryWidget';

const VehicleDetailDrawer = ({ vehicle, onClose }) => {
  if (!vehicle) {
    return (
      <div className="h-full flex flex-col bg-slate-900/50 border border-slate-800 rounded-xl p-6 shadow-lg justify-center items-center text-center">
        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 border border-slate-700">
          <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
        <h3 className="text-sm font-bold text-slate-400 mb-1">No Vehicle Selected</h3>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Select a vehicle from the list</p>
      </div>
    );
  }

  // Extend with mock data for UI visualization requirements not present in backend schema
  const details = {
    ...vehicle,
    eta: vehicle.eta || "14:30 EST",
    current_route: vehicle.current_route || "Nagpur Sector 4",
    optimization_score: 92,
    weather: vehicle.weather_factor ? (vehicle.weather_factor > 1.2 ? "Rain" : "Clear") : "Clear",
    traffic: vehicle.traffic_factor ? (vehicle.traffic_factor > 1.2 ? "Heavy" : "Light") : "Light",
    progress: 68
  };

  return (
    <div className="h-full flex flex-col bg-slate-900/90 border border-slate-700 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden relative backdrop-blur-xl">
      
      {/* Drawer Header Controls */}
      <div className="flex justify-between items-center p-4 border-b border-slate-700/80 bg-slate-950/80 relative z-20 shadow-md">
        <h2 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
          </span>
          Operations Intelligence
        </h2>
        <button 
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar relative z-10">
        
        {/* Section 1: Overview */}
        <VehicleOverviewCard vehicle={details} />

        {/* Section 2: Fleet Intelligence Widgets */}
        <div>
          <h3 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Fleet Intelligence
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <TelemetryWidget 
              title="Current Speed" 
              value={details.speed || 0} 
              unit="km/h" 
              colorClass="blue"
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            />
            <TelemetryWidget 
              title="Weather" 
              value={details.weather} 
              colorClass="cyan"
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              }
            />
            <TelemetryWidget 
              title="Traffic" 
              value={details.traffic} 
              colorClass="amber"
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              }
            />
            <TelemetryWidget 
              title="Opt. Score" 
              value={details.optimization_score} 
              colorClass="emerald"
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </div>
        </div>

        {/* Section 3: Route Information */}
        <div>
          <h3 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Route Information
          </h3>
          <div className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-4 shadow-inner">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Active Route</p>
                <p className="text-sm font-bold text-slate-200 mt-0.5">{details.current_route}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">ETA</p>
                <p className="text-sm font-bold text-blue-400 mt-0.5">{details.eta}</p>
              </div>
            </div>
            
            {/* Delivery Progress Bar */}
            <div>
              <div className="flex justify-between text-[9px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">
                <span>Delivery Progress</span>
                <span className="text-blue-400">{details.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                <div className="bg-blue-500 h-full rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(59,130,246,0.5)]" style={{ width: `${details.progress}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Task Placeholder */}
        <div>
          <h3 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            Task Management
          </h3>
          <div className="border border-dashed border-slate-700 bg-slate-950/40 rounded-xl p-4 text-center hover:bg-slate-800/40 hover:border-blue-500/50 transition-all cursor-pointer group shadow-sm">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-2 border border-slate-700 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-colors">
              <svg className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">Assign New Task</p>
            <p className="text-[9px] text-slate-500 mt-1 uppercase tracking-widest">Vehicle is available</p>
          </div>
        </div>

      </div>
      
      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-700/80 bg-slate-950/80 grid grid-cols-2 gap-3 relative z-20">
        <button className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors border border-slate-700 shadow-sm flex justify-center items-center gap-2 group">
          <svg className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          Focus Map
        </button>
        <button className="py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] flex justify-center items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          View Route
        </button>
      </div>
    </div>
  );
};

export default VehicleDetailDrawer;
