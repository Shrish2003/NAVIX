import logging
from contextlib import asynccontextmanager
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router
from app.services.kafka_consumer import kafka_consumer_service
from app.services.state_manager import state_manager

logging.basicConfig(level=logging.INFO)

@asynccontextmanager
async def lifespan(app: FastAPI):
    backend_root = Path(__file__).resolve().parents[1]
    legacy_app_path = backend_root / "app.py"

    if legacy_app_path.exists():
        logging.warning("Legacy entrypoint detected at %s. Use app.main:app only.", legacy_app_path)

    logging.info("Navix backend started using app.main entrypoint")
    logging.info("app.main startup state_manager id=%s", id(state_manager))
    # Startup: Start listening to Kafka
    logging.info("Starting Kafka consumer thread from app.main lifespan")
    kafka_consumer_service.start()
    yield
    # Shutdown: Stop Kafka consumer thread gracefully
    logging.info("Stopping Kafka consumer thread from app.main lifespan")
    kafka_consumer_service.stop()

app = FastAPI(
    title="Navix Intelligence Layer", 
    description="Real-time decision making backend for Navix using Kafka data streams",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
