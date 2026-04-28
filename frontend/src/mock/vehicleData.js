/**
 * Mock data matching backend schema
 * Structure: { vehicle_id, latitude, longitude, speed, traffic_factor, weather_factor, timestamp }
 */

export const mockVehicles = [
  {
    vehicle_id: "VH001",
    latitude: 21.1458,
    longitude: 79.0882,
    speed: 45,
    traffic_factor: 0.6,
    weather_factor: 0.8,
    timestamp: "2026-04-28T10:30:00Z",
    destination: "Central Hub",
    status: "active",
  },
  {
    vehicle_id: "VH002",
    latitude: 21.1520,
    longitude: 79.0950,
    speed: 38,
    traffic_factor: 0.75,
    weather_factor: 0.8,
    timestamp: "2026-04-28T10:30:05Z",
    destination: "North Terminal",
    status: "active",
  },
  {
    vehicle_id: "VH003",
    latitude: 21.1400,
    longitude: 79.0800,
    speed: 52,
    traffic_factor: 0.4,
    weather_factor: 0.85,
    timestamp: "2026-04-28T10:30:10Z",
    destination: "South Zone",
    status: "active",
  },
  {
    vehicle_id: "VH004",
    latitude: 21.1550,
    longitude: 79.0700,
    speed: 35,
    traffic_factor: 0.85,
    weather_factor: 0.75,
    timestamp: "2026-04-28T10:30:15Z",
    destination: "East Market",
    status: "active",
  },
  {
    vehicle_id: "VH005",
    latitude: 21.1300,
    longitude: 79.1000,
    speed: 48,
    traffic_factor: 0.5,
    weather_factor: 0.82,
    timestamp: "2026-04-28T10:30:20Z",
    destination: "West Depot",
    status: "active",
  },
];

/**
 * Mock optimization result
 */
export const mockOptimizationResult = {
  selected_vehicle: "VH001",
  cost: 156.5,
  reasoning:
    "Selected due to lower traffic factor (0.6) and optimal speed (45 km/h) with best weather conditions (0.8)",
  alternatives: [
    { vehicle_id: "VH003", cost: 162.3 },
    { vehicle_id: "VH005", cost: 168.7 },
  ],
  timestamp: "2026-04-28T10:30:25Z",
};

/**
 * Generate mock routes for vehicles
 */
export const mockRoutes = {
  VH001: [
    [21.1458, 79.0882],
    [21.1480, 79.0900],
    [21.1500, 79.0920],
  ],
  VH002: [
    [21.1520, 79.0950],
    [21.1535, 79.0965],
    [21.1550, 79.0980],
  ],
  VH003: [
    [21.1400, 79.0800],
    [21.1385, 79.0780],
    [21.1370, 79.0760],
  ],
  VH004: [
    [21.1550, 79.0700],
    [21.1560, 79.0680],
    [21.1570, 79.0660],
  ],
  VH005: [
    [21.1300, 79.1000],
    [21.1320, 79.1020],
    [21.1340, 79.1040],
  ],
};
