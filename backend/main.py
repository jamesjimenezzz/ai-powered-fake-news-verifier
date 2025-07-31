from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from app import (
    extract_from_image, extract_from_pdf, verify_source
)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class ClaimRequest(BaseModel):
    query: str

@app.get("/api/hello")
def hello():
    return {"message": "Hello World"}



@app.post("/verify")
def verify_text(req: ClaimRequest):
    verify_source(req.query)

@app.post("/verify-file")
def verify_file(file: UploadFile = File(...)):
    filename = file.filename.lower()
    os.makedirs("temp_uploads", exist_ok=True)
    temp_path = os.path.join("temp_uploads", filename)

    with open(temp_path, "wb") as f:
        f.write(file.read())
    
    try:
        if filename.endswith(".pdf"):
            text = extract_from_pdf(temp_path)
        elif filename.endswith((".jpg", ".jpeg", ".png", ".webp")):
            text = extract_from_image(temp_path)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type. Upload PDF or image.")
        
        if not text.strip():
            raise HTTPException(status_code=400, detail="No readable text found in the file.")
        
        return verify_source(text)
    
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)