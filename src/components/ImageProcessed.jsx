import React from 'react';
import PropTypes from 'prop-types';

const ImageProcessed = ({ processedImage, onZuckMeMore }) => {
  return (
    <div className="flex flex-col justify-center w-full h-full">
      <div className="-mt-10 mb-5 flex flex-row justify-end items-center">
        <a
          href={processedImage}
          download="zucked.jpg"
          className="btn btn-purple"
        >
          Download
        </a>
        <button onClick={() => onZuckMeMore()} className="btn btn-discret">
          ZUCK ME MORE
        </button>
      </div>
      <div className="flex-1 text-center overflow-hidden">
        <img
          src={processedImage}
          alt="Zucked"
          className="inline-block max-w-full max-h-full h-auto"
        />
      </div>
    </div>
  );
};

ImageProcessed.propTypes = {
  processedImage: PropTypes.string.isRequired,
  onZuckMeMore: PropTypes.func.isRequired,
};

export default ImageProcessed;
