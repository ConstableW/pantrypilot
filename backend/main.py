from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import init_db
from routes import router

app = FastAPI(title="PantryPilot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Für Dev, später anpassen
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()
app.include_router(router, prefix="/api")
