# Component Reference Guide

Quick reference for all Navix Frontend components.

## Components Overview

| Component | Location | Purpose | Props |
|-----------|----------|---------|-------|
| **Sidebar** | `components/Sidebar.jsx` | Main navigation | `activeTab`, `onTabChange` |
| **MapView** | `components/MapView.jsx` | Fleet map display | `selectedVehicleId`, `onVehicleSelect` |
| **VehicleList** | `components/VehicleList.jsx` | Vehicle list panel | `vehicles`, `selectedVehicleId`, `onVehicleSelect` |
| **VehicleCard** | `components/VehicleCard.jsx` | Individual vehicle | `vehicle`, `isSelected`, `onSelect` |
| **InfoPanel** | `components/InfoPanel.jsx` | Vehicle details | `vehicle`, `isLoading` |
| **OptimizationPanel** | `components/OptimizationPanel.jsx` | Optimization results | `optimization`, `isLoading` |
| **KPISection** | `components/KPISection.jsx` | Metrics dashboard | `vehicles` |

---

## Pages

| Page | Location | Purpose | Content |
|------|----------|---------|---------|
| **Dashboard** | `pages/Dashboard.jsx` | Main overview | KPIs + Map + Optimization |
| **Vehicles** | `pages/Vehicles.jsx` | Vehicle management | VehicleList + InfoPanel |

---

## Service Layer

| Function | Location | Returns | Purpose |
|----------|----------|---------|---------|
| `getVehicles()` | `services/api.js` | Array of vehicles | Fetch all vehicles |
| `getVehicleById(id)` | `services/api.js` | Vehicle object | Fetch single vehicle |
| `getOptimization()` | `services/api.js` | Optimization result | Get fleet optimization |
| `getOptimizationForVehicle(id)` | `services/api.js` | Optimization result | Get vehicle-specific optimization |

---

## Mock Data

| Data | Location | Structure | Count |
|------|----------|-----------|-------|
| **Vehicles** | `mock/vehicleData.js` | `mockVehicles` array | 5 vehicles |
| **Routes** | `mock/vehicleData.js` | `mockRoutes` object | 5 routes |
| **Optimization** | `mock/vehicleData.js` | `mockOptimizationResult` | 1 result |

---

## Data Schema

### Vehicle Object
```javascript
{
  vehicle_id: "VH001",
  latitude: 21.1458,
  longitude: 79.0882,
  speed: 45,
  traffic_factor: 0.6,
  weather_factor: 0.8,
  timestamp: "2026-04-28T10:30:00Z",
  destination: "Central Hub",
  status: "active"
}
```

### Optimization Result
```javascript
{
  selected_vehicle: "VH001",
  cost: 156.5,
  reasoning: "Selected due to lower traffic factor...",
  alternatives: [
    { vehicle_id: "VH003", cost: 162.3 },
    { vehicle_id: "VH005", cost: 168.7 }
  ],
  timestamp: "2026-04-28T10:30:25Z"
}
```

---

## UI Layout

### Dashboard Page
```
┌─────────────────────────────────────────┐
│  KPI Section (8 metrics in 4-column grid) │
├────────────────────────┬─────────────────┤
│                        │                 │
│   MapView              │ OptimizationPanel│
│   (2 columns)          │ (1 column)      │
│                        │                 │
└────────────────────────┴─────────────────┘
```

### Vehicles Page
```
┌────────────────────────┬─────────────────────┐
│                        │                     │
│  VehicleList           │   InfoPanel         │
│  (1 column)            │   (2 columns)       │
│                        │                     │
└────────────────────────┴─────────────────────┘
```

---

## Color Coding

### Vehicle Status (MapView)
- 🟢 **Green** - Inactive vehicle
- 🔵 **Blue** - Selected vehicle

### Speed Indicator (VehicleCard)
- 🟢 **Green** - Speed > 50 km/h
- 🟡 **Yellow** - Speed 30-50 km/h
- 🔴 **Red** - Speed < 30 km/h

### Traffic Factor (InfoPanel)
- 🔴 **Red** - Traffic > 70% (High)
- 🟡 **Yellow** - Traffic 40-70% (Medium)
- 🟢 **Green** - Traffic < 40% (Low)

### Weather Factor
- 🟢 **Green** - Weather > 80% (Excellent)
- 🟡 **Yellow** - Weather 60-80% (Good)
- 🟠 **Orange** - Weather < 60% (Fair)

---

## KPI Metrics (KPISection)

1. **Total Vehicles** - Total count
2. **Active** - Active vehicle count + percentage
3. **Avg Speed** - Average speed in km/h
4. **Traffic Level** - Traffic classification (High/Medium/Low)
5. **Weather Impact** - Average weather factor as percentage
6. **Max Speed** - Maximum vehicle speed
7. **Min Speed** - Minimum vehicle speed
8. **System Status** - Operational status indicator

---

## State Management

### App.jsx
```javascript
const [activeTab, setActiveTab] = useState("dashboard");
```

### Dashboard.jsx
```javascript
const [vehicles, setVehicles] = useState([]);
const [optimization, setOptimization] = useState(null);
const [selectedVehicleId, setSelectedVehicleId] = useState(null);
const [loadingOptimization, setLoadingOptimization] = useState(false);
```

### Vehicles.jsx
```javascript
const [vehicles, setVehicles] = useState([]);
const [selectedVehicleId, setSelectedVehicleId] = useState(null);
const [selectedVehicle, setSelectedVehicle] = useState(null);
const [loadingVehicle, setLoadingVehicle] = useState(false);
```

---

## Responsive Breakpoints

- **Mobile:** Not optimized (desktop-first)
- **Tablet:** Grid adjusts to 2-column layout
- **Desktop:** Full 3-4 column grid layout

---

## Theme Colors

```css
Primary Background:   #0a0e1a (slate-950)
Secondary Background: #0f172a (slate-900)
Tertiary Background:  #1e293b (slate-800)

Accent Blue:          #3b82f6 (blue-500)
Success Green:        #10b981 (emerald-500)
Warning Yellow:       #f59e0b (amber-500)
Error Red:            #ef4444 (red-500)
Info Cyan:            #06b6d4 (cyan-500)
Purple:               #a855f7 (purple-500)

Text Primary:         #e2e8f0 (slate-200)
Text Secondary:       #94a3b8 (slate-400)
Border:               #334155 (slate-700)
```

---

## Simulated API Delays

- `getVehicles()` - 300ms
- `getVehicleById()` - 200ms
- `getOptimization()` - 500ms
- `getOptimizationForVehicle()` - 500ms

---

## File Dependencies

```
App.jsx
├── Sidebar.jsx
├── Dashboard.jsx
│   ├── KPISection.jsx
│   ├── MapView.jsx
│   └── OptimizationPanel.jsx
└── Vehicles.jsx
    ├── VehicleList.jsx
    │   └── VehicleCard.jsx
    └── InfoPanel.jsx

All components import from:
├── mock/vehicleData.js
└── services/api.js
```

---

## Future Integration Points

1. **Update `api.js`** - Replace mock data with real API calls
2. **Add error handling** - Error boundaries and error states
3. **Add loading states** - Loading skeletons
4. **Add Leaflet map** - Real map with vehicle markers
5. **Add real-time updates** - WebSocket integration
6. **Add filters/search** - Vehicle filtering options
7. **Add export** - Data export functionality
8. **Add user auth** - Login/authentication system

---

## Backend API Endpoints (Expected)

When backend is ready, these endpoints will be called:

```
GET /vehicles
  Response: Array of vehicle objects

GET /vehicle/{vehicle_id}
  Response: Single vehicle object

GET /optimize
  Response: Optimization result object

POST /optimize
  Payload: { vehicle_id }
  Response: Optimization result for vehicle
```

---

Version: 1.0  
Last Updated: 2026-04-28  
Status: Ready for development
