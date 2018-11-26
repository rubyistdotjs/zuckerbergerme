import React from 'react';
import PropTypes from 'prop-types';

import { loadImage, imageSizeToFit } from '../utils';
import zuckSrc from '../images/zuck-o.png';
import fullZuckSrc from '../images/full-zuck.png';

class ImageProcess extends React.PureComponent {
  state = {
    loadingImgAvailable: false,
  };

  async getFaceBoundingBoxes(image, width, height) {
    const { faceapi } = this.props;

    const detections = await faceapi.detectAllFaces(image);
    const scaledDetections = detections.map(fd => fd.forSize(width, height));
    return scaledDetections.map(d => d.box);
  }

  generateProcessedImageBlob(canvas) {
    return new Promise(function(resolve, reject) {
      canvas.toBlob(blob => resolve(blob), 'image/jpeg', 0.9);
    });
  }

  async componentDidMount() {
    const { rawImage, onImageProcessed } = this.props;
    const image = await loadImage(URL.createObjectURL(rawImage));
    const { naturalWidth: imgWidth, naturalHeight: imgHeight } = image;
    const { width, height } = imageSizeToFit(imgWidth, imgHeight, 1600, 1600);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, imgWidth, imgHeight, 0, 0, width, height);

    const theZuck = await loadImage(zuckSrc);
    const faces = await this.getFaceBoundingBoxes(image, width, height);
    faces.forEach(box => {
      context.drawImage(theZuck, box.x, box.y, box.width, box.height);
    });

    const processedImageBlob = await this.generateProcessedImageBlob(canvas);
    const processedImage = URL.createObjectURL(processedImageBlob);
    onImageProcessed(processedImage);
  }

  handleLoadingImgAvailable = evt => {
    this.setState({ loadingImgAvailable: true });
  };

  render() {
    const { loadingImgAvailable } = this.state;

    return (
      <div className="w-full h-full flex items-center justify-center">
        <img
          src={fullZuckSrc}
          alt="loading"
          className={`w-32 h-auto ${loadingImgAvailable ? 'rotate' : 'hidden'}`}
          onLoad={this.handleLoadingImgAvailable}
        />
      </div>
    );
  }
}

ImageProcess.propTypes = {
  faceapi: PropTypes.object.isRequired,
  rawImage: PropTypes.object.isRequired,
  onImageProcessed: PropTypes.func.isRequired,
};

export default ImageProcess;
