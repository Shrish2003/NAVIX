# ============================================================
# Navix – Start Kafka (KRaft mode, no Docker, no Zookeeper)
# Run AFTER setup_kafka.ps1 has been executed once
# ============================================================

$KAFKA_DIR = "$PSScriptRoot\kafka_server"
$CONFIG = "$KAFKA_DIR\config\kraft\server.properties"

if (-not (Test-Path "$KAFKA_DIR\bin")) {
    Write-Host "[ERROR] Kafka not found. Run setup_kafka.ps1 first." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Starting Kafka broker (KRaft mode)..." -ForegroundColor Cyan
Write-Host "  Config: $CONFIG"
Write-Host "  Broker: localhost:9092"
Write-Host ""
Write-Host "Press Ctrl+C to stop." -ForegroundColor Gray
Write-Host ""

& "$KAFKA_DIR\bin\windows\kafka-server-start.bat" $CONFIG
