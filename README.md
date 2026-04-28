# 🚀 Navix – Autonomous Fleet Management & Logistics Optimization System

## 📌 Overview

Navix is a real-time fleet management system that simulates multiple vehicles moving on real-world road networks. It uses OSRM for routing, Kafka for real-time data streaming, FastAPI as the backend, and React + Leaflet for visualization.

This system mimics real-world logistics platforms like Uber, Swiggy, or Zomato by enabling live tracking, route-based movement, and scalable data pipelines.

---

## 🧠 Architecture

Simulator → Kafka → Backend → Frontend
              ↑
             OSRM

---

## ⚙️ Tech Stack

* **Python** – Vehicle Simulator
* **Kafka + Zookeeper** – Real-time data streaming
* **FastAPI** – Backend API
* **React + Leaflet** – Frontend dashboard
* **OSRM** – Routing engine (offline maps)

---

## 🔄 How It Works

1. Simulator generates multiple vehicles with routes (A → B)
2. OSRM provides real road paths
3. Vehicles send live GPS data to Kafka
4. Backend consumes Kafka stream and stores latest data
5. Frontend fetches API and displays vehicles on map

---

## 📦 Features

* 🚗 Real-time vehicle tracking
* 🗺️ Route-based movement (not random)
* ⚡ Kafka streaming pipeline
* 📊 Interactive dashboard
* 🔁 Continuous simulation

---

## 🛠️ Setup Instructions

### 1️⃣ Start Kafka

```bash
cd kafka
docker compose up -d
```

### 2️⃣ Start OSRM

```bash
docker run -p 5000:5000 -v ./osrm:/data osrm/osrm-backend osrm-routed /data/nagpur_osm.osrm
```

### 3️⃣ Start Backend

```bash
cd backend
uvicorn app.main:app --reload
```

### 4️⃣ Start Simulator

```bash
cd simulator
python vehicle_simulator.py
```

### 5️⃣ Start Frontend

```bash
cd frontend
npm install
npm start
```

---

## 📊 API Endpoints

* `GET /vehicles` → Get all vehicle data
* `GET /vehicle/{id}` → Get specific vehicle

---

## 🚀 Future Improvements

* 🔥 Route visualization (A → B path)
* 🤖 AI-based route optimization
* 📉 Delay prediction
* 📡 WebSocket for real-time updates
* 🚦 Traffic-aware routing

---

## 🏆 Why This Project is Strong

* Real-time distributed system
* Uses industry tools (Kafka, FastAPI, React)
* Simulates real logistics platform
* Scalable architecture
## 📄 License

MIT Li
