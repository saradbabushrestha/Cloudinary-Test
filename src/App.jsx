import { useState } from "react";
import "./App.css";
import Axios from "axios";
import { Image } from "cloudinary-react";

function App() {
  const [imageSelected, setImageSelected] = useState("");
  const [uploadedImageId, setUploadedImageId] = useState("");

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "CLouddd");

    Axios.post(
      "https://api.cloudinary.com/v1_1/dfcpkxoa2/image/upload",
      formData
    )
      .then((response) => {
        console.log("Image uploaded successfully:", response.data);
        setUploadedImageId(response.data.public_id);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          setImageSelected(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload Image</button>

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
