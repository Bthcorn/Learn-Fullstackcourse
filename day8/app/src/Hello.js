import React, { useState } from "react";
import axios from "axios";
import config from "./components/config";

export default function Hello() {
  const [fileSelected, setFileSelected] = useState({});

  const selectedFile = (fileInput) => {
    if (fileInput.length && fileInput) {
      setFileSelected(fileInput[0]);
    }
  };

  const UploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append('myFile', fileSelected);

      await axios.post(config.apiPath + '/book/testUpload', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return <div>
    <input type="file" onChange={(e) => selectedFile(e.target.files)} />
    <button className="bth bth-primary" onClick={UploadFile}>Upload Now</button>
  </div>;
}
