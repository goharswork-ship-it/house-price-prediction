from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

from app.schemas import HouseFeatures
from app.model_loader import load_model

app = FastAPI(title="House Price Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = load_model()

@app.get("/")
def home():
    return {"message": "House Price Prediction API is running"}

@app.post("/predict")
def predict_price(features: HouseFeatures):
    input_data = pd.DataFrame([features.model_dump()])
    prediction = model.predict(input_data)[0]
    price_usd = prediction * 100000

    return {
        "predicted_price_usd": round(price_usd, 2)
    }