# **Image Inpainting Widget**

A simple React-based image inpainting tool that allows users to upload an image, draw masks on it, and save both the original image and the mask for further processing. This project includes a FastAPI backend for handling image uploads and storage.

---

## **Features**

- **Image Upload**:
  - Supports uploading images in JPEG/PNG format.
  - Displays the uploaded image as the background.

- **Mask Drawing**:
  - Allows users to draw a mask on the uploaded image using a brush.
  - Adjustable brush size for finer control.

- **Canvas Operations**:
  - Clear the canvas to reset the mask while keeping the uploaded image.
  - Save the mask and the original image.

- **FastAPI Backend**:
  - Stores the uploaded images (original and mask) in a designated directory.
  - Serves the stored images through an API.

---

## **Tech Stack**

### **Frontend**
- React
- `react-canvas-draw`
- Axios for API communication

### **Backend**
- FastAPI
- Python
- PIL for image handling
- `os` for file management

---

## **Setup Instructions**

### **Prerequisites**
- Node.js and npm installed.
- Python 3.7+ installed.

---

### **Frontend Setup**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/VoidMain0xx/image-inpainting-widget.git
   cd image-inpainting-widget/frontend

2. **Install dependencies**
     ```bash
     npm install

3. **Run the development server**
    ```bash
    npm start

#### **Backend Setup**

1. **Navigate to the backend directory**

```bash
cd ../backend
```

2. **Create a virtual environment**

```bash
python -m venv venv
source venv/bin/activate   
```


3. **Install dependencies**

```bash
pip install fastapi uvicorn pillow
```


4. **pip install fastapi uvicorn pillow**

```bash
pip install fastapi uvicorn pillow
```


5. **Run API**

```bash
uvicorn main:app --reload
```

