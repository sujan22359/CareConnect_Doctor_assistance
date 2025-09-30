from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from gemini import get_specialization
from hospital_api import search_hospitals

app = FastAPI()

# ✅ Enable CORS (connects frontend and backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict to your frontend domain later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/get_doctor")
def get_doctor(symptom: str = Query(...), location: str = Query(...)):
    try:
        # 1. Get specialization from Gemini
        specialization = get_specialization(symptom)

        # 2. Find hospitals near location
        hospitals = search_hospitals(location, specialization)

        suggestions = []
        for h in hospitals:
            suggestions.append({
                "name": h.get("display_name", "Unknown Hospital"),
                "lat": h.get("lat"),
                "lon": h.get("lon"),
                "specialization": specialization,
                "contact": "Not Available (OSM Free API)"
            })

        return {
            "symptom": symptom,
            "specialization": specialization,
            "suggestions": suggestions
        }
    
    except Exception as e:
        print(f"Error in get_doctor endpoint: {e}")
        return {
            "error": "An error occurred while processing your request",
            "symptom": symptom,
            "specialization": "general physician",
            "suggestions": []
        }
