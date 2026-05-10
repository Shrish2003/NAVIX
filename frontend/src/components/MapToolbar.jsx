import React from "react";

const MapToolbar = ({ 
  vehicles = [], 
  isLoading = false, 
  onCenterMap, 
  onResetZoom, 
  onToggleFullscreen,
  lastUpdated = new Date()
}) => {
  const activeCount = vehicles.filter(v => v.status === "active").length;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-slate-900 border-b border-slate-800 gap-4">
      {/* Information Section */}
      <div className="flex items-center gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            Fleet Command Map
            {isLoading ? (
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
            ) : (
              <span className="flex h-2 w-2 relative">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            )}
          </h2>
          <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
            <span>Nagpur Region</span>
            <span className="text-slate-600">•</span>
            <span>{vehicles.length} Total</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400">{activeCount} Active</span>
          </div>
        </div>

        {/* Live Status Badge */}
        <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 flex items-center gap-2 shadow-inner">
          <svg className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-blue-400' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {isLoading ? "Syncing..." : "Live"}
          <span className="ml-1 text-[10px] text-slate-500 hidden sm:inline">
            Updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Utilities Section */}
      <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800 shadow-inner">
        <button 
          onClick={onCenterMap}
          className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors group relative"
          title="Center on Nagpur"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        <div className="w-px h-5 bg-slate-800"></div>
        <button 
          onClick={onResetZoom}
          className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors group relative"
          title="Reset Zoom"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </button>
        <div className="w-px h-5 bg-slate-800"></div>
        <button 
          onClick={onToggleFullscreen}
          className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors group relative"
          title="Toggle Fullscreen"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MapToolbar;
