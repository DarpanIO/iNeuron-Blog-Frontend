import React, { useState, useContext } from "react";
import articleContext from "../../../context/articles/articleContext";

const CategoriesImageUpload = (props) => {
  // const [selectedImage, setSelectedImage] = useState(null)
  const selectedImage = props.selectedImage;
  const setSelectedImage = props.setSelectedImage;
  const context = useContext(articleContext);
  const { uploadFile } = context;
  const category = props.category;
  const setCategory = props.setCategory;
  const handleCoverImgUpload = async () => {
    const fileInput = document.querySelector("#CategoryLogoInput");
    let image_id = await uploadFile(fileInput);
    setCategory({ ...category, logo: image_id });
  };

  return (
    <div>
      <div
        // style={{width: "300px",backgroundColor:"grey",height:"300px"}}
        className="d-flex justify-content-center"
      >
        {selectedImage && (
          <div>
            <img
              alt="not fount"
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />
            <br />
            <a onClick={() => setSelectedImage(null)} className="btn">
              Remove
            </a>
          </div>
        )}
      </div>

      <br />

      <br />
      <div className="d-flex flex-column my-1">
        <label htmlFor="CategoryLogoInput" className="btn">
          Choose Category Logo
        </label>
        <input
          type="file"
          name="myImage"
          id="CategoryLogoInput"
          className="d-none"
          accept="image/*"
          onChange={(event) => {
            setSelectedImage(event.target.files[0]);
          }}
        />
      </div>
      <a
        onClick={handleCoverImgUpload}
        className={`btn btn-primary ${!selectedImage ? "disabled" : ""}`}
      >
        Upload
      </a>
      {category.logo && (
        <label htmlFor="" className="mx-1">
          Image Uploaded
        </label>
      )}
    </div>
  );
};

export default CategoriesImageUpload;
