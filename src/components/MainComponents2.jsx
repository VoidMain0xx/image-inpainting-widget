import React, { useRef, useState, useEffect } from 'react';
import { Button, Upload, message } from 'antd';
import { CanvasDraw } from 'react-canvas-draw';
import './MainComponents.css';

const MainComponents = () => {
  const [image, setImage] = useState(null);
  const canvasRef = useRef();
  const [brushRadius, setBrushRadius] = useState(10);

  // Effect to draw background image when image changes
  useEffect(() => {
    drawBackgroundImage(); // Ensure this function exists
  }, [image]); // Added image to dependency array
  // function to draw the background image
  const drawBackgroundImage = () => {
    if (canvasRef.current && image) {
      const ctx = canvasRef.current.getContext('2d');
      const img = new Image();
      img.src = image;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
      };
    }
  };

  const handleImageUpload = (info) => {
    if (info.file.status === 'done') {
      const url = URL.createObjectURL(info.file.originFileObj);
      setImage(url);
    }
  };

  const handleBrushSizeChange = (delta) => {
    setBrushRadius((prevRadius) => Math.max(1, prevRadius + delta));
  };

  const handleSaveMask = async () => {
    const maskCanvas = canvasRef.current.getSaveData();
    const maskImage = new Image();
    maskImage.src = maskCanvas;

    const formData = new FormData();
    formData.append('original_image', image);
    formData.append('mask_image', maskCanvas);

    try {
      const response = await fetch('http://127.0.0.1:8000/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        message.success('Images uploaded successfully!');
      } else {
        message.error('Error uploading images: ' + result.error);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      message.error('An error occurred while uploading images.');
    }
  };

  return (
    <div className="main-container">
      <h1>Image Inpainting Widget</h1>
      <div className="image-upload">
        <Upload
          name="image"
          listType="picture"
          showUploadList={false}
          accept="image/*"
          beforeUpload={() => false}
          onChange={handleImageUpload}
        >
          <Button>Upload Image</Button>
        </Upload>
      </div>

      {image && (
        <div className="canvas-container">
          <canvas ref={canvasRef} className="canvas-draw" width="500" height="500" />
          <div className="controls">
            <Button onClick={() => handleBrushSizeChange(1)}>Increase Brush Size</Button>
            <Button onClick={() => handleBrushSizeChange(-1)}>Decrease Brush Size</Button>
            <Button onClick={() => canvasRef.current.clear()}>Clear Mask</Button>
            <Button onClick={handleSaveMask}>Save Mask</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainComponents;
