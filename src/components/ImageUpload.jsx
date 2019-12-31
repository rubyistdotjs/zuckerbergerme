import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function ImageUpload({ onImageChange }) {
  const onDrop = useCallback(
    acceptedFiles => {
      onImageChange(acceptedFiles[0]);
    },
    [onImageChange]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: ['image/png', 'image/jpeg'],
    multiple: false,
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={`${
        isDragActive ? 'border-purple-400' : ''
      } flex-1 flex flex-col justify-center items-center text-center w-full h-full p-8 md:p-12 border-2 border-grey-400 border-dashed rounded`}
    >
      <h1 className="text-black text-2xl font-semibold leading-tight antialiased mb-2">
        Drag & Drop your picture here
      </h1>
      <span className="text-gray-500 font-semibold leading-tight">
        Only .png, .jpg or .jpeg
      </span>
      <input {...getInputProps()} />
      <button onClick={open} className="btn btn-purple mt-8">
        Select a picture
      </button>
    </div>
  );
}

export default ImageUpload;
