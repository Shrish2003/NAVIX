/**
 * API Service Layer
 * Real backend integration for FastAPI endpoints
 * Exposes: getVehicles, getVehicleById, getOptimization, getOptimizationForVehicle
 */

import axios from "axios";

export const API_BASE = process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000";

const client = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
});

export const getVehicles = async () => {
  try {
    const res = await client.get("/vehicles");
    return res.data;
  } catch (err) {
    console.error("api.getVehicles error:", err.message || err);
    throw err;
  }
};

export const getVehicleById = async (vehicleId) => {
  try {
    const res = await client.get(`/vehicle/${encodeURIComponent(vehicleId)}`);
    return res.data;
  } catch (err) {
    console.error("api.getVehicleById error:", err.message || err);
    throw err;
  }
};

export const getOptimization = async () => {
  try {
    const res = await client.get(`/optimize`);
    return res.data;
  } catch (err) {
    console.error("api.getOptimization error:", err.message || err);
    throw err;
  }
};

export const getOptimizationForVehicle = async (vehicleId) => {
  try {
    const res = await client.post(`/optimize`, { vehicle_id: vehicleId });
    return res.data;
  } catch (err) {
    console.error("api.getOptimizationForVehicle error:", err.message || err);
    throw err;
  }
};
