import React, { useState } from 'react';
import RouteMap from '../components/routes/RouteMap';
import RouteTable from '../components/routes/RouteTable';
import RouteDetailDrawer from '../components/routes/RouteDetailDrawer';

const RoutesPage = () => {
  const [activeRouteId, setActiveRouteId] = useState(null);

  return (
    <div className="h-full w-full flex flex-col gap-5 overflow-hidden pb-4">
      
      {/* Top Header */}
      <div className="flex-shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide">Route Intelligence</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time path visualization and tracking</p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-5 overflow-hidden relative">
        
        {/* Left Col: Route List */}
        <div className="w-full lg:w-80 xl:w-[400px] flex-shrink-0 h-full">
          <RouteTable activeRouteId={activeRouteId} onRouteSelect={setActiveRouteId} />
        </div>

        {/* Right Col: Map Area */}
        <div className="flex-1 h-full min-w-0 relative">
          <RouteMap activeRouteId={activeRouteId} />
          
          {/* Overlaid Detail Drawer inside Map Area */}
          <div 
            className={`absolute top-4 right-4 bottom-4 w-80 xl:w-96 transition-all duration-500 ease-in-out z-[2000]
              ${activeRouteId ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}`}
          >
            <RouteDetailDrawer routeId={activeRouteId} onClose={() => setActiveRouteId(null)} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default RoutesPage;
