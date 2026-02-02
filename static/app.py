import os
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables for local development
load_dotenv()

app = FastAPI()

# 1. Configure Gemini API
# Make sure GEMINI_API_KEY is set in your Vercel Environment Variables
API_KEY = os.getenv("GEMINI_API_KEY")
if API_KEY:
    genai.configure(api_key=API_KEY)
    model = genai.GenerativeModel('gemini-1.5-flash')
else:
    print("Warning: GEMINI_API_KEY not found.")

# 2. Define the Chat Request Model
class ChatRequest(BaseModel):
    message: str

# 3. Gemini Chat Endpoint
@app.post("/api/chat")
async def chat_with_ai(request: ChatRequest):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="AI Service Config Missing")
    
    try:
        # System instructions to keep Gemini in character for BowdenNextGen
        context = (
            "You are the BowdenNextGenNetworks AI Assistant. "
            "You represent Orlando's leading next-gen MSP. "
            "Expertise: Zero Trust, Network Security, and Cloud Governance. "
            "Be professional, technical, and helpful to Central Florida businesses."
        )
        response = model.generate_content(f"{context}\n\nUser: {request.message}")
        return {"reply": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 4. Serve the Static Frontend
# This mounts the 'static' folder you just created in GitHub
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def serve_home():
    # Points to the index.html inside your new static folder
    return FileResponse("static/index.html")
