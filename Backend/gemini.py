import google.generativeai as genai

# Configure Gemini
GEMINI_API_KEY = "Replace with your API key"
genai.configure(api_key=GEMINI_API_KEY)

# Use gemini-2.0-flash model as requested
model = genai.GenerativeModel("gemini-2.0-flash")

def get_specialization(symptom: str) -> str:
    """
    Ask Gemini to classify the symptom into a medical specialization.
    """
    try:
        prompt = f"""
        The patient says: "{symptom}".
        Based on this, tell me the most relevant type of doctor or specialist they should see.
        Only return the specialization name in one word like:
        cardiologist, orthopedic, neurologist, dermatologist, pediatrician, ophthalmologist, general physician.
        """

        response = model.generate_content(prompt)
        specialization = response.text.strip().lower()

        # Clean up the response to ensure it's a single word
        specialization = specialization.split()[0] if specialization.split() else "general physician"
        
        return specialization
    
    except Exception as e:
        print(f"Error getting specialization from Gemini: {e}")
        # Return a default specialization if Gemini fails
        return "general physician"
