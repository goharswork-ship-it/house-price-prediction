import joblib
from pathlib import Path

MODEL_PATH = Path(__file__).resolve().parent.parent / "models" / "house_price_model.pkl"

def load_model():
    model = joblib.load(MODEL_PATH)
    return model