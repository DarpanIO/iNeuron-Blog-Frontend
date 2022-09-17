import React, { useState, useContext } from "react";
import articleContext from "../../../context/articles/articleContext";

const TrusteesImageUpload = (props) => {
const [selectedImage, setSelectedImage] = useState(null)
  const context = useContext(articleContext);
  const { uploadFile } = context;
  const trustee= props.trustee
  const setTrustee= props.setTrustee
  const handleCoverImgUpload =async  () => {
    const fileInput = document.querySelector("#TrusteeImageInput");
    let image_id = await uploadFile(fileInput)
    setTrustee({...trustee,photo:image_id});
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
          <a onClick={() => setSelectedImage(null)} className="btn">Remove</a>
        </div>
      )}
    </div>

      <br />

      <br />
      <div className="d-flex flex-column my-1">

      <label htmlFor="TrusteeImageInput" className="btn">Choose Trustee Image</label>
      <input
        type="file"
        name="myImage"
        id="TrusteeImageInput"
        className="d-none"
        accept="image/*"
        onChange={(event) => {
          setSelectedImage(event.target.files[0]);
        }
        }
      />
      </div>
      <a onClick={handleCoverImgUpload} className={`btn btn-primary ${!selectedImage?'disabled':''}`}>Upload</a>
      {trustee.photo && <label htmlFor="" className="mx-1">Image Uploaded</label>}
    </div>
  );
};

export default TrusteesImageUpload;
