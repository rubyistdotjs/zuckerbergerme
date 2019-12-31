import React, { useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';

import './application.css';

import Initialization from './components/Initialization';
import ImageUpload from './components/ImageUpload';
import ImageProcess from './components/ImageProcess';
import ImageProcessed from './components/ImageProcessed';

function App() {
  const [initialization, setInitialization] = useState(true);
  const [rawImage, setRawImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  useEffect(() => {
    faceapi
      .loadSsdMobilenetv1Model('/models')
      .then(() => setInitialization(false));
  }, []);

  const handleReset = () => {
    setRawImage(null);
    setProcessedImage(null);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen p-16">
      {initialization ? (
        <Initialization />
      ) : rawImage && !processedImage ? (
        <ImageProcess
          faceapi={faceapi}
          rawImage={rawImage}
          onImageProcessed={setProcessedImage}
        />
      ) : processedImage ? (
        <ImageProcessed
          processedImage={processedImage}
          onZuckMeMore={handleReset}
        />
      ) : (
        <ImageUpload onImageChange={setRawImage} />
      )}
    </div>
  );
}

export default App;
