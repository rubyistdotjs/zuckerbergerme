import React from 'react';
import * as faceapi from 'face-api.js';

import './application.css';

import Initialization from './components/Initialization';
import ImageUpload from './components/ImageUpload';
import ImageProcess from './components/ImageProcess';
import ImageProcessed from './components/ImageProcessed';

class App extends React.PureComponent {
  state = {
    initialization: true,
    rawImage: null,
    processedImage: null,
  };

  async componentDidMount() {
    await faceapi.loadSsdMobilenetv1Model('/models');
    // await faceapi.loadFaceLandmarkTinyModel('/models');
    this.setState({ initialization: false });
  }

  handleImageChange = image => {
    this.setState({ rawImage: image });
  };

  handleImageProcessed = image => {
    this.setState({ processedImage: image });
  };

  handleReset = evt => {
    this.setState({ rawImage: null, processedImage: null });
  };

  render() {
    const { initialization, rawImage, processedImage } = this.state;

    return (
      <div className="flex justify-center items-center w-screen h-screen p-16">
        {initialization ? (
          <Initialization />
        ) : rawImage && !processedImage ? (
          <ImageProcess
            faceapi={faceapi}
            rawImage={rawImage}
            onImageProcessed={this.handleImageProcessed}
          />
        ) : processedImage ? (
          <ImageProcessed
            processedImage={processedImage}
            onZuckMeMore={this.handleReset}
          />
        ) : (
          <ImageUpload onImageChange={this.handleImageChange} />
        )}
      </div>
    );
  }
}

export default App;
