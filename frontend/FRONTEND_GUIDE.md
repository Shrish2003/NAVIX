# Navix Frontend - React UI

A modular, clean React-based frontend for the Navix fleet intelligence system. Fully aligned with FastAPI backend architecture with mock data for development.

## 🎯 Project Overview

**Status:** Ready for real-time integration  
**Framework:** React 19.2.5  
**Styling:** Tailwind CSS 3.4.19  
**Data:** Mock data (backend schema matched)  
**API Layer:** Service layer prepared for future integration

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Sidebar.jsx          # Navigation sidebar
│   │   ├── MapView.jsx          # Mock map with vehicle markers
│   │   ├── VehicleList.jsx      # List of vehicles
│   │   ├── VehicleCard.jsx      # Individual vehicle card
│   │   ├── InfoPanel.jsx        # Vehicle details panel
│   │   ├── OptimizationPanel.jsx # Optimization results
│   │   └── KPISection.jsx       # Fleet KPIs dashboard
│   │
│   ├── pages/                   # Full page components
│   │   ├── Dashboard.jsx        # Main dashboard view
│   │   └── Vehicles.jsx         # Vehicles management page
│   │
│   ├── services/                # API service layer
│   │   └── api.js              # Mock API calls (ready for backend)
│   │
│   ├── mock/                    # Mock data matching backend schema
│   │   └── vehicleData.js      # Sample vehicle & optimization data
│   │
│   ├── App.jsx                  # Main app component
│   ├── index.js                 # React entry point
│   ├── index.css                # Global Tailwind styles
│   └── [other files]
│
└── package.json                 # Dependencies & scripts
```

---

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm start
```

Runs at: `http://localhost:3000`

### Build for Production
```bash
npm build
```

---

## 🧩 Component Architecture

### **Sidebar**
- Navigation menu (Dashboard, Vehicles, Routes, Optimization)
- Status indicator
- Version info
- Dark theme with hover effects

### **MapView**
- Mock map display (not connected to Leaflet yet)
- Vehicle markers with status colors
- Click to select vehicles
- Displays coordinates and speed
- Legend for vehicle statuses

### **VehicleCard**
- Displays individual vehicle info
- Shows: vehicle_id, speed, traffic_factor, weather_factor
- Color-coded metrics (green/yellow/red)
- Click to select
- Shows destination and status

### **VehicleList**
- Scrollable list of all vehicles
- Uses VehicleCard component
- Active vehicle count
- Click to select vehicle

### **InfoPanel**
- Detailed info for selected vehicle
- Displays all metrics with progress bars
- Location coordinates
- Last updated timestamp
- Shows condition quality indicators

### **OptimizationPanel**
- Shows optimization result
- Selected vehicle recommendation
- Cost value
- Reasoning explanation
- Alternative vehicles with costs
- Optimization factor breakdown

### **KPISection**
- Fleet dashboard metrics
- Total vehicles, active count
- Average speed, traffic level
- Weather impact, max/min speed
- System status

### **Pages**
- **Dashboard:** Overview with KPIs, map, and optimization
- **Vehicles:** List of vehicles with detailed info panel

---

## 📊 Mock Data Schema

All mock data matches backend API structure:

```javascript
{
  vehicle_id: string,         // e.g., "VH001"
  latitude: number,           // GPS latitude
  longitude: number,          // GPS longitude
  speed: number,              // km/h
  traffic_factor: number,     // 0-1 (0 = no traffic, 1 = high traffic)
  weather_factor: number,     // 0-1 (0 = bad, 1 = excellent)
  timestamp: string,          // ISO 8601 datetime
  destination: string,        // Target location
  status: string             // "active", "inactive"
}
```

---

## 🔌 Service Layer (API Integration Ready)

The `api.js` service layer is prepared for backend integration:

```javascript
// Currently returns mock data with simulated delay

getVehicles()           // Future: GET /vehicles
getVehicleById(id)      // Future: GET /vehicle/{id}
getOptimization()       // Future: GET /optimize
getOptimizationForVehicle(id) // Future: POST /optimize
```

### To Connect to Backend Later:

Replace mock data returns with actual API calls:

```javascript
// Example (when backend is ready):
export const getVehicles = async () => {
  const response = await fetch('http://localhost:8000/vehicles');
  return response.json();
};
```

---

## 🎨 Design System

### Colors (Dark Theme)
- **Background:** `#0a0e1a` (slate-950)
- **Cards:** `#0f172a` (slate-900)
- **Accent:** `#3b82f6` (blue-500)
- **Success:** `#10b981` (emerald-500)
- **Warning:** `#f59e0b` (amber-500)
- **Error:** `#ef4444` (red-500)

### Spacing
- Uses Tailwind's standard spacing scale
- Consistent padding: 4px (1 unit)
- Gap between elements: 3-4 units

### Typography
- **Font:** Inter (from Google Fonts)
- **Headings:** Bold (font-bold)
- **Body:** Regular (font-normal)
- **Size:** Responsive with Tailwind breakpoints

---

## 🎯 State Management

Uses React hooks:
- `useState()` for component state
- `useEffect()` for data loading
- Props for component communication
- No external state library (scalable for Redux/Zustand later)

### Key State Variables:
```javascript
vehicles              // Array of vehicle objects
selectedVehicleId     // Currently selected vehicle ID
optimization          // Optimization result object
loadingVehicle        // Loading indicator
```

---

## 🔄 Data Flow

1. **App.jsx** → Selects active tab
2. **Dashboard.jsx / Vehicles.jsx** → Request data via `api.js`
3. **api.js** → Returns mock data with simulated delay
4. **Components** → Render data with Tailwind styling
5. **User Interaction** → Update selected vehicle, update panels

---

## ⚡ Performance Considerations

- Components are modular and reusable
- Mock API calls have simulated delays (200-500ms) for realistic feel
- No external API calls being made
- Light dependency footprint
- Tailwind CSS is purged in production (minimal CSS size)

---

## 🔐 No Backend Calls

✅ **No real API calls**  
✅ **Mock data only**  
✅ **Structure ready for backend**  
✅ **All data hardcoded in `vehicleData.js`**  
✅ **Service layer is placeholder**

---

## 📦 Dependencies

```json
{
  "react": "^19.2.5",
  "react-dom": "^19.2.5",
  "react-scripts": "5.0.1",
  "leaflet": "^1.9.4",
  "react-leaflet": "^5.0.0",
  "axios": "^1.15.2",
  "tailwindcss": "^3.4.19",
  "autoprefixer": "^10.5.0",
  "postcss": "^8.5.12"
}
```

---

## 🚀 Ready for Integration

When backend is ready:

1. Update `api.js` to make real API calls
2. Remove mock data
3. Update service layer endpoints
4. Components will work without changes

### Backend Endpoints (Expected):
```
GET /vehicles              # List all vehicles
GET /vehicle/{id}          # Get single vehicle
GET /optimize              # Get optimization result
```

---

## 📝 Notes

- All components use `.jsx` extension
- Tailwind CSS classes used throughout
- Dark theme with blue accents
- Responsive grid layout
- Mock data includes 5 sample vehicles in Nagpur region
- No hardcoded API URLs in components

---

## 🎬 UI Pages

### Dashboard Tab
- Fleet overview with KPIs
- Map view with vehicle markers
- Optimization panel
- Real-time metrics

### Vehicles Tab
- Complete vehicle list
- Detailed vehicle information
- Searchable and interactive
- Click to select vehicle

### Routes Tab (Placeholder)
- Coming soon

### Optimization Tab (Placeholder)
- Coming soon

---

## 🛠️ Development

All components are structured for easy modification:
- Update mock data → `src/mock/vehicleData.js`
- Add features → Create new components in `src/components/`
- Add pages → Create new files in `src/pages/`
- Styling → Use Tailwind CSS classes

---

Built with ❤️ for Navix Fleet Intelligence System
