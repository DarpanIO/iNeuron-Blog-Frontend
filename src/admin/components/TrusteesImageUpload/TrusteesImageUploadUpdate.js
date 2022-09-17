import React, { useState, useContext } from "react";
import articleContext from "../../../context/articles/articleContext";

const TrusteesImageUploadUpdate = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const context = useContext(articleContext);
  const { uploadFile } = context;
  const trustee = props.trustee;
  const setTrustee = props.setTrustee;
  const handleCoverImgUpload = async () => {
    const fileInput = document.querySelector("#TrusteeImageInputEdit");
    let image_id = await uploadFile(fileInput);
    setTrustee({ ...trustee, photo: image_id });
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
              alt="not fount"
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />

            <br />
          </div>
        )}
      </div>
      <div className="d-flex flex-column my-1">
        <label htmlFor="TrusteeImageInputEdit" className="btn">
          Choose Trustee Image
        </label>
        <input
          type="file"
          name="myImage"
          id="TrusteeImageInputEdit"
          className="d-none"
          accept="image/*"
          onChange={(event) => {
            setSelectedImage(event.target.files[0]);
          }}
        />
      </div>
      {selectedImage && <a onClick={() => setSelectedImage(null)} className="btn">
              Remove
            </a>}
      {!selectedImage && imageUrl && <a onClick={()=>{
      props.setImageUrl(null)
      setTrustee({ ...trustee, photo: null });
      console.log(imageUrl)
     }} className="btn">Remove</a>}
      <a onClick={handleCoverImgUpload} className={`btn btn-primary ${!selectedImage?'disabled':''}`}>
        Upload
      </a>
      {trustee.photo && (
        <label htmlFor="" className="mx-1">
          Image Uploaded
        </label>
      )}
    </div>
  );
};

export default TrusteesImageUploadUpdate;
