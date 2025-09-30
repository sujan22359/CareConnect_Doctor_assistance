# 🩺 CareConnect: Doctor Assistance Bot

A chatbot application that helps users find nearby doctors and hospitals based on their symptoms and live location.  
This project combines a **FastAPI backend** for medical specialization mapping and a **React (Vite) frontend** for interactive user experience.  

---

## 🚀 Features
- Analyze user symptoms and suggest relevant medical specialization.  
- Provide nearby hospitals and doctors with contact details.  
- Detect user location automatically (via browser GPS).  
- Simple and interactive chat-style frontend.  

---

## 🏗 Project Structure
```
careconnect-doctor-bot/
│── backend/
│   │── app.py                # FastAPI app
│   │── hospital_api.py       # Hospital & doctor lookup logic
│   │── gemini.py    # Maps symptoms → specializations
│   │── requirements.txt      # Backend dependencies
│
│── frontend/
│   │── index.html
│   │── package.json
│   │── vite.config.js
│   └── src/
│       │── App.jsx           # Main React app
│       │── main.jsx
│       │── index.css
│       │── components/       # Reusable UI components
│
│── README.md
```

---

## ⚙️ Backend Setup (FastAPI)

1. Navigate to backend:
   ```bash
   cd backend
   ```

2. Create virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate   # Mac/Linux
   venv\Scripts\activate      # Windows
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run backend locally:
   ```bash
   uvicorn app:app --reload
   ```

👉 Backend runs on `http://127.0.0.1:8000`  

---

## 🎨 Frontend Setup (React + Vite)

1. Navigate to frontend:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run frontend locally:
   ```bash
   npm run dev
   ```

👉 Frontend runs on `http://localhost:5173`  

---

## 🔗 Connecting Frontend & Backend Locally
In `frontend/src/App.jsx`, make sure the API URL points to your backend:  

```js
const API_URL = "http://127.0.0.1:8000/get_doctor";
```

---

## 🛠 Tech Stack
- **Frontend**: React (Vite), JavaScript  
- **Backend**: FastAPI, Python  
- **APIs**: OpenStreetMap (Nominatim) for free geolocation lookup  

---

## 📌 Future Improvements
- Add user authentication & profiles.  
- Store doctor data in a real database.  
- Support multiple languages.  
- Smarter symptom-to-diagnosis mapping using AI/ML.  


