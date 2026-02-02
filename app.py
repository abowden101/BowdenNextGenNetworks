from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load local environment variables (for local testing)
load_dotenv()

app = FastAPI()

# 1. Configure Gemini with your API Key
# Note: On Vercel, you'll set GEMINI_API_KEY in the dashboard
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-1.5-flash')

# 2. Define the Request Data Model
class ChatRequest(BaseModel):
    message: str

# 3. Create the AI Chat Endpoint
@app.post("/api/chat")
async def chat_with_gemini(request: ChatRequest):
    try:
        # System instructions to keep Gemini in "BowdenNextGen" character
        system_context = (
            "You are the BowdenNextGenNetworks AI advisor. "
            "You provide expert MSP and network security advice for Orlando businesses. "
            "Be professional, concise, and technical."
        )
        
        full_prompt = f"{system_context}\nUser: {request.message}"
        response = model.generate_content(full_prompt)
        
        return {"reply": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI SOC Offline: {str(e)}")

@app.get("/")
def home():
    return {"status": "BowdenNextGen SOC Active", "location": "Orlando, FL"}
