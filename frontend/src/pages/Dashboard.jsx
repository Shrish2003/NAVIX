import React, { useState, useEffect } from "react";
import KPISection from "../components/KPISection";
import OptimizationPanel from "../components/OptimizationPanel";
import MapView from "../components/MapView";
import { getVehicles, getOptimization } from "../services/api";

const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [optimization, setOptimization] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [loadingOptimization, setLoadingOptimization] = useState(false);

  // Load vehicles on mount
  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        const vehiclesData = await getVehicles();
        if (!mounted) return;
        setVehicles(vehiclesData || []);
      } catch (error) {
        console.error("Failed to load vehicles:", error);
        if (!mounted) return;
        setVehicles([]);
      }
    };

    // initial load
    loadData();

    // poll every 2 seconds
    const interval = setInterval(loadData, 2000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  // Load optimization on mount
  useEffect(() => {
    let mounted = true;
    const loadOptimization = async () => {
      setLoadingOptimization(true);
      try {
        const result = await getOptimization();
        if (!mounted) return;
        setOptimization(result);
      } catch (error) {
        console.error("Failed to load optimization:", error);
      } finally {
        if (mounted) setLoadingOptimization(false);
      }
    };

    loadOptimization();
    // refresh optimization every 5s
    const optInterval = setInterval(loadOptimization, 5000);
    return () => {
      mounted = false;
      clearInterval(optInterval);
    };
  }, []);

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden">
      {/* KPI Section */}
      <div className="flex-shrink-0">
        <KPISection vehicles={vehicles} />
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-3 gap-4 overflow-hidden">
        {/* Map View - Takes 2 columns */}
        <div className="col-span-2 overflow-hidden rounded-lg border border-slate-700">
          <MapView
            vehicles={vehicles}
            selectedVehicleId={selectedVehicleId}
            onVehicleSelect={setSelectedVehicleId}
          />
        </div>

        {/* Optimization Panel - Takes 1 column */}
        <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-950">
          <OptimizationPanel
            optimization={optimization}
            isLoading={loadingOptimization}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
