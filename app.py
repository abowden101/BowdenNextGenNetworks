from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI()

# 1. Mount the "static" folder so CSS/JS are reachable
# This ensures style.css is found at /static/style.css
app.mount("/static", StaticFiles(directory="static"), name="static")

# 2. Serve index.html at the root URL
@app.get("/")
async def read_index():
    return FileResponse(os.path.join("static", "index.html"))

# ... Keep your @app.post("/api/chat") code here ...

@app.get("/")
def home():
    return {"status": "BowdenNextGen SOC Active", "location": "Orlando, FL"}
