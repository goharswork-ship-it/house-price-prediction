async function predictPrice() {
  const data = {
    MedInc: parseFloat(document.getElementById("MedInc").value),
    HouseAge: parseFloat(document.getElementById("HouseAge").value),
    AveRooms: parseFloat(document.getElementById("AveRooms").value),
    AveBedrms: parseFloat(document.getElementById("AveBedrms").value),
    Population: parseFloat(document.getElementById("Population").value),
    AveOccup: parseFloat(document.getElementById("AveOccup").value),
    Latitude: parseFloat(document.getElementById("Latitude").value),
    Longitude: parseFloat(document.getElementById("Longitude").value)
  };

  document.getElementById("result").innerText = "Predicting...";

  try {
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    document.getElementById("result").innerText =
      "Predicted Price: $" + result.predicted_price_usd.toLocaleString();
  } catch (error) {
    document.getElementById("result").innerText =
      "Error: API is not connected. Make sure FastAPI server is running.";
  }
}