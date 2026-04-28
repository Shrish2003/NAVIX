$KAFKA_VERSION = "3.9.2"
$SCALA_VERSION = "2.13"
$KAFKA_DIR = "$PSScriptRoot\kafka_server"
$KAFKA_TGZ = "kafka_${SCALA_VERSION}-${KAFKA_VERSION}.tgz"
$DOWNLOAD_URL = "https://downloads.apache.org/kafka/${KAFKA_VERSION}/${KAFKA_TGZ}"

Write-Host "Navix Kafka Setup (KRaft mode - No Docker/Zookeeper needed)" -ForegroundColor Cyan
Write-Host "Kafka version: $KAFKA_VERSION" -ForegroundColor Gray

if (Test-Path "$KAFKA_DIR\bin\windows\kafka-server-start.bat") {
    Write-Host "Kafka already installed at $KAFKA_DIR" -ForegroundColor Green
} else {
    Write-Host "Downloading Kafka $KAFKA_VERSION (~100 MB)..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Force -Path $KAFKA_DIR | Out-Null
    Invoke-WebRequest -Uri $DOWNLOAD_URL -OutFile "$PSScriptRoot\$KAFKA_TGZ" -UseBasicParsing

    Write-Host "Extracting..." -ForegroundColor Yellow
    tar -xzf "$PSScriptRoot\$KAFKA_TGZ" -C $KAFKA_DIR --strip-components=1
    Remove-Item "$PSScriptRoot\$KAFKA_TGZ" -Force
    Write-Host "Kafka extracted OK." -ForegroundColor Green
}

Write-Host "Formatting KRaft storage..." -ForegroundColor Yellow
$CONFIG = "$KAFKA_DIR\config\kraft\server.properties"
$LOG_DIR = "$KAFKA_DIR\kafka-logs"
New-Item -ItemType Directory -Force -Path $LOG_DIR | Out-Null

$UUID = (& "$KAFKA_DIR\bin\windows\kafka-storage.bat" random-uuid 2>&1) | Where-Object { $_ -match '^[a-zA-Z0-9_-]{22}$' } | Select-Object -First 1
if (-not $UUID) {
    $UUID = [System.Guid]::NewGuid().ToString("N").Substring(0,22)
}
Write-Host "Cluster UUID: $UUID"
& "$KAFKA_DIR\bin\windows\kafka-storage.bat" format -t $UUID -c $CONFIG

Write-Host "Setup complete! Run .\start_kafka.ps1 to start Kafka." -ForegroundColor Green
