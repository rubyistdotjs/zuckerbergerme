import React, { useCallback } from 'react';
import Dropzone from 'react-dropzone';

function ImageUpload({ onImageChange }) {
  const acceptedMimeTypes = ['image/png', 'image/jpeg'];

  const handleDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      onImageChange(acceptedFiles[0]);
    },
    [onImageChange]
  );

  return (
    <Dropzone
      accept={acceptedMimeTypes}
      multiple={false}
      disableClick={true}
      onDrop={handleDrop}
    >
      {({ getRootProps, getInputProps, isDragActive, open }) => (
        <div
          {...getRootProps()}
          className={`${
            isDragActive ? 'border-purple-light' : ''
          } flex-1 flex flex-col justify-center items-center text-center w-full h-full p-8 md:p-12 border-2 border-grey-light border-dashed rounded`}
        >
          <h1 className="text-black text-2xl font-semibold leading-tight antialiased mb-2">
            Drag & Drop your picture here
          </h1>
          <span className="text-grey font-semibold leading-tight">
            Only .png, .jpg or .jpeg
          </span>
          <input {...getInputProps()} />
          <button onClick={() => open()} className="btn btn-purple mt-8">
            Select a picture
          </button>
        </div>
      )}
    </Dropzone>
  );
}

export default ImageUpload;
