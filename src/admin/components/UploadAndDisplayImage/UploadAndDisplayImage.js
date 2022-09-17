import React, { useState, useContext } from "react";
import articleContext from "../../../context/articles/articleContext";
import './UploadAndDisplay.css'
const UploadAndDisplayImage = (props) => {

  // const [imageId, setImageId] = useState("")
  // const imageId= props.coverImageId;
  // const setImageId = props.setCoverImageId
  const context = useContext(articleContext);
  const { uploadFile, article, setArticle,selectedImage,setSelectedImage } = context;
  let imageUrl=props.imageUrl
  const handleCoverImgUpload =async  () => {
    const fileInput = document.querySelector("#my-input");
    let image_id = await uploadFile(fileInput)
    // let image_id = "dddd"
    // article.coverImage=image_id
    setArticle({...article, cover_img: image_id});
  };
  const handleCoverImgRemove =async  () => {
    setArticle({...article, cover_img: null});
  };

  return (
    <div className="my-3">
    <div 
    
    className="uploadCoverImgBoxArticle my-2"
    >
      {imageUrl && !selectedImage && <div>
      <img src={imageUrl}/>
      
      </div>}
      {selectedImage && (
        <div>
          <img
            alt="not fount"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
        </div>
      )}

      <label htmlFor="my-input" className="my-2 chooseLabel btn  w-100">Choose Cover image</label>
      <input
        type="file"
        name="myImage"
        id="my-input"
        className="d-none"
        accept="image/*"
        onChange={(event) => {
          setSelectedImage(event.target.files[0]);
        }
        }
      />
      </div>
      {selectedImage && <a onClick={() => setSelectedImage(null)} className="btn">Remove</a>}
     {!selectedImage && imageUrl && <label htmlFor="my-input" className="my-2 chooseLabel btn  w-100">Change Cover image</label>}
     {!selectedImage && imageUrl && <a onClick={()=>{
      props.setImageUrl(null)
      handleCoverImgRemove() 
      console.log(imageUrl)
     }} className="btn">Remove</a>}
      <a onClick={handleCoverImgUpload} className={`btn btn-primary ${selectedImage?"":"disabled"}`}>Upload</a>
      {article.cover_img && <label htmlFor="" className="mx-1">Image Uploaded</label>}
    </div>
  );
};

export default UploadAndDisplayImage;
