import React, { useState, useEffect, useCallback } from 'react';

import { loadImage, imageSizeToFit } from '../utils';
import zuckSrc from '../images/zuck-o.png';
import fullZuckSrc from '../images/full-zuck.png';

function ImageProcess({ faceapi, rawImage, onImageProcessed }) {
  const [loadingImgAvailable, setLoadingImgAvailable] = useState(false);

  const generateProcessedImageBlob = canvas => {
    return new Promise(function(resolve, reject) {
      canvas.toBlob(blob => resolve(blob), 'image/jpeg', 0.9);
    });
  };

  const getFaceBoundingBoxes = useCallback(
    async (image, width, height) => {
      const detections = await faceapi.detectAllFaces(image);
      const scaledDetections = detections.map(fd => fd.forSize(width, height));
      return scaledDetections.map(d => d.box);
    },
    [faceapi]
  );

  const processImage = useCallback(
    async img => {
      const image = await loadImage(URL.createObjectURL(img));
      const { naturalWidth: imgWidth, naturalHeight: imgHeight } = image;
      const { width, height } = imageSizeToFit(imgWidth, imgHeight, 1600, 1600);

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, imgWidth, imgHeight, 0, 0, width, height);

      const theZuck = await loadImage(zuckSrc);
      const faces = await getFaceBoundingBoxes(image, width, height);
      faces.forEach(box => {
        context.drawImage(theZuck, box.x, box.y, box.width, box.height);
      });

      const processedImageBlob = await generateProcessedImageBlob(canvas);
      return URL.createObjectURL(processedImageBlob);
    },
    [getFaceBoundingBoxes]
  );

  useEffect(
    () => {
      processImage(rawImage).then(onImageProcessed);
    },
    [onImageProcessed, processImage, rawImage]
  );

  return (
    <div className="w-full h-full flex items-center justify-center">
      <img
        src={fullZuckSrc}
        alt="loading"
        className={`w-32 h-auto ${loadingImgAvailable ? 'rotate' : 'hidden'}`}
        onLoad={setLoadingImgAvailable}
      />
    </div>
  );
}

export default ImageProcess;
