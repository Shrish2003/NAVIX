 # ============================================================
# Navix – Full Stack Startup Script (PowerShell)
# Run from project root: .\start_navix.ps1
# ============================================================

$ROOT = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   NAVIX Fleet Intelligence System      " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# ── Step 1: Start Infrastructure ──────────────────────────
Write-Host "[1/4] Starting Kafka + OSRM via Docker Compose..." -ForegroundColor Yellow
Set-Location "$ROOT\kafka"
docker compose up -d

Write-Host "      Waiting 20s for services to initialize..." -ForegroundColor Gray
Start-Sleep -Seconds 20

# ── Step 2: Verify Docker containers are running ──────────
Write-Host ""
Write-Host "[2/4] Container status:" -ForegroundColor Yellow
docker ps --format "table {{.Names}}`t{{.Status}}`t{{.Ports}}"

# ── Step 3: Start FastAPI Backend ─────────────────────────
Write-Host ""
Write-Host "[3/4] Starting FastAPI Intelligence Backend (port 8000)..." -ForegroundColor Yellow
Set-Location "$ROOT\backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"
Start-Sleep -Seconds 3

# ── Step 4: Start Vehicle Simulator ───────────────────────
Write-Host ""
Write-Host "[4/4] Starting Vehicle Simulator (5 vehicles)..." -ForegroundColor Yellow
Set-Location "$ROOT\simulator"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "python vehicle_simulator.py"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   All services launched!" -ForegroundColor Green
Write-Host ""
Write-Host "   API:       http://localhost:8000"
Write-Host "   Docs:      http://localhost:8000/docs"
Write-Host "   OSRM:      http://localhost:5000"
Write-Host "   Kafka:     localhost:9092"
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
