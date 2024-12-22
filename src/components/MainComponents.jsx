import React, { useState, useRef, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import axios from "axios";

const MainComponents = () => {
  const [image, setImage] = useState(null);
  const [brushRadius, setBrushRadius] = useState(10);
  const canvasRef = useRef();
  const backgroundCanvasRef = useRef();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const drawBackgroundImage = () => {
    if (image && backgroundCanvasRef.current) {
      const ctx = backgroundCanvasRef.current.getContext("2d");
      const img = new Image();
      img.src = image;

      img.onload = () => {
        ctx.clearRect(0, 0, 500, 500); // Clear previous image if any
        ctx.drawImage(img, 0, 0, 500, 500); // Draw the uploaded image on canvas
      };
    }
  };

  useEffect(() => {
    drawBackgroundImage();
  }, [image]);

  const handleClearCanvas = () => {
    canvasRef.current.clear();
    drawBackgroundImage(); // Redraw the background image
  };

  const handleSaveMask = async () => {
    const maskCanvas = canvasRef.current.canvas.drawing;

    maskCanvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("original_image", image);
      formData.append("mask_image", blob);

      try {
        await axios.post("http://127.0.0.1:8000/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Images uploaded successfully!");
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Image Inpainting Widget</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && (
        <div style={{ position: "relative", marginTop: "20px", width: "500px", height: "500px" }}>
          {/* Background Canvas */}
          <canvas
            ref={backgroundCanvasRef}
            width={500}
            height={500}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 0,
              border: "1px solid #000",
            }}
          />

          {/* Mask Canvas Overlaid */}
          <CanvasDraw
            ref={canvasRef}
            brushRadius={brushRadius}
            lazyRadius={5}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
              pointerEvents: "auto", // Allow drawing
            }}
            canvasWidth={500}
            canvasHeight={500}
          />
          <div style={{ marginTop: "10px", zIndex: 2, position: "relative" }}>
            <button onClick={() => setBrushRadius(brushRadius + 1)}>Increase Brush Size</button>
            <button onClick={() => setBrushRadius(brushRadius - 1)}>Decrease Brush Size</button>
            <button onClick={handleClearCanvas}>Clear Mask</button>
            <button onClick={handleSaveMask}>Save Mask</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainComponents;
