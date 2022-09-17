import React, { useState, useContext } from "react";
import articleContext from "../../../context/articles/articleContext";

const CategoriesImageUploadUpdate = (props) => {
  // const [selectedImage, setSelectedImage] = useState(null);
  const selectedImage=props.selectedImage;
  const setSelectedImage = props.setSelectedImage;
  const context = useContext(articleContext);
  const { uploadFile } = context;
  const category = props.category;
  const setCategory = props.setCategory;
  const handleCoverImgUpload = async () => {
    const fileInput = document.querySelector("#CategoryImageInputEdit");
    let image_id = await uploadFile(fileInput);
    setCategory({ ...category, logo: image_id });
  };
  const imageUrl = props.imageUrl;

  return (
    <div>
      <div
      className="d-flex justify-content-center"
      >
        {imageUrl && !selectedImage && (
          <img width={"200px"} src={imageUrl} alt="" />
          
        )}
        {selectedImage && (
          <div className="">
            <img
              alt="not found"
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
        <label htmlFor="CategoryImageInputEdit" className="btn">
          Choose Category Logo
        </label>
        <input
          type="file"
          name="myImage"
          id="CategoryImageInputEdit"
          className="d-none"
          accept="image/*"
          onChange={(event) => {
            setSelectedImage(event.target.files[0]);
          }}
        />
      </div>
      {!selectedImage && imageUrl && <a onClick={() =>{ 
        props.setImageUrl(null)
        setCategory({ ...category, logo: null });
      }} className="btn">
              Remove
      </a>}
      <a onClick={handleCoverImgUpload} className={`btn btn-primary ${!selectedImage?'disabled':''}`}>
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

export default CategoriesImageUploadUpdate;
