import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setImageSelected, setUploadedImageId } from "./Redux/imageSlice";
import { Image } from "cloudinary-react";
import Axios from "axios";

function App() {
  const dispatch = useDispatch();
  const { selectedImage, uploadedImageId } = useSelector(
    (state) => state.image
  );

  const [imageSelectedLocal, setImageSelectedLocal] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      dispatch(
        setImageSelected({
          name: file.name,
          size: file.size,
          type: file.type,
        })
      );

      setImageSelectedLocal(file);
    }
  };

  const uploadImage = () => {
    if (!imageSelectedLocal) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageSelectedLocal);
    formData.append("upload_preset", "CLouddd");

    Axios.post(
      "https://api.cloudinary.com/v1_1/dfcpkxoa2/image/upload",
      formData
    )
      .then((response) => {
        console.log("Image uploaded successfully:", response.data);
        dispatch(setUploadedImageId(response.data.public_id));
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadImage}>Upload Image</button>

      {selectedImage && (
        <div>
          <p>File Name: {selectedImage.name}</p>
          <p>File Size: {(selectedImage.size / 1024).toFixed(2)} KB</p>
          <p>File Type: {selectedImage.type}</p>
        </div>
      )}

      {uploadedImageId && (
        <Image
          style={{
            width: 200,
            marginTop: "20px",
          }}
          cloudName="dfcpkxoa2"
          publicId={uploadedImageId}
        />
      )}
    </div>
  );
}

export default App;
