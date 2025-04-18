from fastapi import FastAPI
from routes import router
import os

app = FastAPI(title="PantryPilot API")

app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "PantryPilot backend is up"}
