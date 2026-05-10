import React from 'react';

const VehicleToolbar = ({ viewMode, setViewMode, searchQuery, setSearchQuery, statusFilter, setStatusFilter, sortBy, setSortBy }) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-4 items-center justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-800 shadow-md">
      {/* Left side: Search */}
      <div className="relative w-full md:w-80 group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search ID, Route, or Driver..." 
          className="w-full bg-slate-950/80 border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2 transition-all shadow-inner placeholder-slate-600 outline-none hover:border-slate-600"
        />
      </div>
      
      {/* Right side: Tools */}
      <div className="flex gap-2 w-full md:w-auto items-center">
        {/* Status Filter */}
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-950/80 border border-slate-700 text-slate-300 text-xs rounded-lg px-3 py-2 outline-none hover:border-slate-600 transition-colors cursor-pointer appearance-none shadow-inner"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="idle">Idle</option>
          <option value="delayed">Delayed</option>
          <option value="maintenance">Maintenance</option>
          <option value="offline">Offline</option>
        </select>

        {/* Sort */}
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-slate-950/80 border border-slate-700 text-slate-300 text-xs rounded-lg px-3 py-2 outline-none hover:border-slate-600 transition-colors cursor-pointer appearance-none shadow-inner"
        >
          <option value="id">Sort by ID</option>
          <option value="speed">Sort by Speed</option>
          <option value="eta">Sort by ETA</option>
          <option value="fuel">Sort by Fuel</option>
        </select>

        <div className="w-px h-6 bg-slate-700 mx-1"></div>

        {/* View Toggle */}
        <div className="flex bg-slate-950/80 rounded-lg border border-slate-700 p-0.5 shadow-inner">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-slate-800 text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
            title="Grid View"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-slate-800 text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
            title="List View"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleToolbar;
