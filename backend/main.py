from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from PIL import Image
import os

app = FastAPI()
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload")
async def upload_images(original_image: UploadFile, mask_image: UploadFile):
    try:
        # Save original image   
        original_path = os.path.join(UPLOAD_DIR, original_image.filename)
        with open(original_path, "wb") as f:
            f.write(await original_image.read())
        
        # Save mask image
        mask_path = os.path.join(UPLOAD_DIR, mask_image.filename)
        with open(mask_path, "wb") as f:
            f.write(await mask_image.read())

        return JSONResponse({"message": "Images uploaded successfully!"})
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

@app.get("/images/{filename}")
async def get_image(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    return JSONResponse({"error": "File not found"}, status_code=404)
