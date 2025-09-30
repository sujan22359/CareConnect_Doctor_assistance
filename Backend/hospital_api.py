import requests

def search_hospitals(location: str, specialization: str = "hospital"):
    """
    Search hospitals/clinics near the given location using OSM Nominatim API.
    """
    base_url = "https://nominatim.openstreetmap.org/search"
    headers = {"User-Agent": "doctor-assist-bot"}

    query = f"{specialization} near {location}"
    params = {"q": query, "format": "json", "addressdetails": 1, "limit": 5}

    response = requests.get(base_url, params=params, headers=headers)
    results = response.json() if response.status_code == 200 else []

    # If no results, fallback to generic hospital search
    if not results:
        params["q"] = f"hospital near {location}"
        response = requests.get(base_url, params=params, headers=headers)
        results = response.json() if response.status_code == 200 else []

    return results
