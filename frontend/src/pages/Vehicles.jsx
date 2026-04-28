import React, { useState, useEffect } from "react";
import VehicleList from "../components/VehicleList";
import InfoPanel from "../components/InfoPanel";
import { getVehicles, getVehicleById } from "../services/api";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loadingVehicle, setLoadingVehicle] = useState(false);

  // Load vehicles on mount
  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        const vehiclesData = await getVehicles();
        if (!mounted) return;
        const data = vehiclesData || [];
        setVehicles(data);
        // Select first vehicle by default
        if (data.length > 0 && !selectedVehicleId) {
          setSelectedVehicleId(data[0].vehicle_id);
        }
      } catch (error) {
        console.error("Failed to load vehicles:", error);
        if (!mounted) return;
        setVehicles([]);
      }
    };

    loadData();
    const interval = setInterval(loadData, 2000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  // Load selected vehicle details
  useEffect(() => {
    if (!selectedVehicleId) return;

    const loadVehicle = async () => {
      setLoadingVehicle(true);
      try {
        const vehicle = await getVehicleById(selectedVehicleId);
        setSelectedVehicle(vehicle);
      } catch (error) {
        console.error("Failed to load vehicle details:", error);
        setSelectedVehicle(null);
      } finally {
        setLoadingVehicle(false);
      }
    };

    loadVehicle();
  }, [selectedVehicleId]);

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-white">Fleet Vehicles</h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage and monitor your active vehicles
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-3 gap-4 overflow-hidden px-4 pb-4">
        {/* Vehicle List - Takes 1 column */}
        <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-950">
          <VehicleList
            vehicles={vehicles}
            selectedVehicleId={selectedVehicleId}
            onVehicleSelect={setSelectedVehicleId}
          />
        </div>

        {/* Info Panel - Takes 2 columns */}
        <div className="col-span-2 overflow-hidden rounded-lg border border-slate-700 bg-slate-950">
          <InfoPanel vehicle={selectedVehicle} isLoading={loadingVehicle} />
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
