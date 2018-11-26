const loadImage = url => {
  return new Promise(function(resolve, reject) {
    const image = document.createElement('img');
    image.onload = () => resolve(image);
    image.onerror = () => reject(image);
    image.src = url;
  });
};

const imageSizeToFit = (
  imageWidth,
  imageHeight,
  containerWidth,
  containerHeight
) => {
  const ratio = Math.min(
    containerWidth / imageWidth,
    containerHeight / imageHeight
  );

  if (ratio >= 1) return { width: imageWidth, height: imageHeight };

  const width = Math.floor(imageWidth * ratio);
  const height = Math.floor(imageHeight * ratio);
  return { width, height };
};

export { loadImage, imageSizeToFit };
