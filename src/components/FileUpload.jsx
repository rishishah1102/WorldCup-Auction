import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ onFileUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      onFileUpload(file);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".xlsx",
  });

  return (
    <div className="bg-yellow-400 w-full -mt-1 pb-6 flex justify-center items-center">
      <div {...getRootProps()} style={dropzoneStyles} className="rounded-lg bg-white relative">
        <input {...getInputProps()} className="" />
        <p className="text-3xl text-gray-600">Drop an Excel file.</p>
      </div>
    </div>
  );
};

const dropzoneStyles = {
  width: "80%",
  padding: "10px",
  textAlign: "center",
  cursor: "pointer",
};

export default FileUpload;
