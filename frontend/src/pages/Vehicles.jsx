import React, { useState, useEffect, useMemo } from "react";
import FleetSummaryBar from "../components/vehicles/FleetSummaryBar";
import VehicleToolbar from "../components/vehicles/VehicleToolbar";
import VehicleTable from "../components/vehicles/VehicleTable";
import VehicleDetailDrawer from "../components/vehicles/VehicleDetailDrawer";
import { getVehicles } from "../services/api";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [isLoading, setIsLoading] = useState(true);

  // Filtering and sorting state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('id');

  // Load vehicles on mount
  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        const vehiclesData = await getVehicles();
        if (!mounted) return;
        const data = vehiclesData || [];
        setVehicles(data);
      } catch (error) {
        console.error("Failed to load vehicles:", error);
        if (!mounted) return;
        setVehicles([]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 2000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []); // removed selectedVehicleId dependency so it doesn't reset polling

  // Filter and Sort logic
  const filteredAndSortedVehicles = useMemo(() => {
    // Determine the base array to use. If no real vehicles, we'll use an empty array 
    // and let VehicleTable inject its mock data internally if needed.
    // Wait, if VehicleTable injects mock data internally, our filtering won't work on it 
    // because it happens here. Let's explicitly inject the mock data here if vehicles is empty, 
    // so we can filter and sort the mock data too!
    
    let baseData = vehicles.length > 0 ? [...vehicles] : [
      { vehicle_id: "V-101", status: "active", speed: 65, current_route: "Nagpur - Mumbai HWY", eta: "14:30", fuel_level: 78, last_updated: "2 min ago" },
      { vehicle_id: "V-102", status: "idle", speed: 0, current_route: "Depot A - Standby", eta: "-", fuel_level: 92, last_updated: "5 min ago" },
      { vehicle_id: "V-103", status: "maintenance", speed: 0, current_route: "Service Bay 4", eta: "-", fuel_level: 15, last_updated: "1 hr ago" },
      { vehicle_id: "V-104", status: "delayed", speed: 25, current_route: "Urban Sector 7", eta: "16:45", fuel_level: 45, last_updated: "1 min ago" },
      { vehicle_id: "V-105", status: "active", speed: 82, current_route: "Highway 44 North", eta: "11:20", fuel_level: 60, last_updated: "Just now" },
      { vehicle_id: "V-106", status: "offline", speed: 0, current_route: "Unknown", eta: "-", fuel_level: 0, last_updated: "2 days ago" }
    ];

    let result = [...baseData];

    // Status Filter
    if (statusFilter !== 'all') {
      result = result.filter(v => (v.status || 'offline').toLowerCase() === statusFilter);
    }

    // Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(v => 
        v.vehicle_id.toLowerCase().includes(q) || 
        (v.current_route && v.current_route.toLowerCase().includes(q))
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'id') {
        return a.vehicle_id.localeCompare(b.vehicle_id);
      } else if (sortBy === 'speed') {
        return (b.speed || 0) - (a.speed || 0); // Descending speed
      } else if (sortBy === 'fuel') {
        return (b.fuel_level || 0) - (a.fuel_level || 0); // Descending fuel
      } else if (sortBy === 'eta') {
        // Simple string comparison for ETA for mock purposes
        return (a.eta || "").localeCompare(b.eta || "");
      }
      return 0;
    });

    return result;
  }, [vehicles, searchQuery, statusFilter, sortBy]);

  // Derived counts for summary bar based on TOTAL vehicles, not filtered
  const summaryData = vehicles.length > 0 ? vehicles : filteredAndSortedVehicles;
  const total = summaryData.length;
  const active = summaryData.filter(v => v.status === "active").length;
  const maintenance = summaryData.filter(v => v.status === "maintenance").length;

  // Selected vehicle details from base data to ensure drawer still works if filtered out
  const baseDataForSelection = vehicles.length > 0 ? vehicles : filteredAndSortedVehicles;
  const selectedVehicle = baseDataForSelection.find(v => v.vehicle_id === selectedVehicleId) || null;

  const closeDrawer = () => setSelectedVehicleId(null);

  return (
    <div className="h-full flex flex-col gap-5 overflow-hidden pb-4">
      {/* Fleet Summary Header */}
      <div className="flex-shrink-0">
        <FleetSummaryBar 
          total={total || 124} 
          active={active || 89} 
          maintenance={maintenance || 5} 
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-5 overflow-hidden">
        
        {/* Left Column: Toolbar & Table */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-900/30 rounded-xl border border-slate-800 p-4 shadow-lg shadow-black/10">
          <VehicleToolbar 
            viewMode={viewMode} setViewMode={setViewMode} 
            searchQuery={searchQuery} setSearchQuery={setSearchQuery}
            statusFilter={statusFilter} setStatusFilter={setStatusFilter}
            sortBy={sortBy} setSortBy={setSortBy}
          />
          <VehicleTable 
            vehicles={filteredAndSortedVehicles} 
            selectedId={selectedVehicleId} 
            onSelect={setSelectedVehicleId} 
            viewMode={viewMode}
            isLoading={isLoading && vehicles.length === 0}
            hasRealData={vehicles.length > 0} // flag to tell Table not to override with its own mock if empty due to filter
          />
        </div>

        {/* Right Column: Detail Side Panel (Animated Drawer) */}
        <div 
          className={`flex-shrink-0 overflow-hidden transition-all duration-500 ease-in-out absolute md:relative inset-y-0 right-0 z-50 md:z-auto h-full
            ${selectedVehicleId 
              ? 'w-full md:w-96 xl:w-[400px] opacity-100 translate-x-0' 
              : 'w-0 opacity-0 translate-x-full md:translate-x-0'
            }`}
        >
          <div className="w-full md:w-96 xl:w-[400px] h-full shadow-[-10px_0_30px_rgba(0,0,0,0.5)] md:shadow-none">
            <VehicleDetailDrawer vehicle={selectedVehicle} onClose={closeDrawer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
