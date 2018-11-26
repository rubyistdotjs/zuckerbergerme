import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

class ImageUpload extends React.PureComponent {
  state = {
    acceptedMimeTypes: ['image/png', 'image/jpeg'],
  };

  handleDrop = (acceptedFiles, rejectedFiles) => {
    this.props.onImageChange(acceptedFiles[0]);
  };

  render() {
    const { acceptedMimeTypes } = this.state;

    return (
      <Dropzone
        accept={acceptedMimeTypes}
        multiple={false}
        disableClick={true}
        onDrop={this.handleDrop}
        className="flex-1 flex flex-col justify-center items-center text-center w-full h-full p-8 md:p-12 border-2 border-grey-light border-dashed rounded"
        activeClassName="border-purple-light"
      >
        {({ open }) => (
          <React.Fragment>
            <h1 className="text-black text-2xl font-semibold leading-tight antialiased mb-2">
              Drag & Drop your picture here
            </h1>
            <span className="text-grey font-semibold leading-tight">
              Only .png, .jpg or .jpeg
            </span>
            <button onClick={() => open()} className="btn btn-purple mt-8">
              Select a picture
            </button>
          </React.Fragment>
        )}
      </Dropzone>
    );
  }
}

ImageUpload.propTypes = {
  onImageChange: PropTypes.func.isRequired,
};

export default ImageUpload;
