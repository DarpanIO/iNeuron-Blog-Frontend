import React, { useState, useContext } from "react";
import articleContext from "../../../context/articles/articleContext";
import './pdfFile.css'
const PdfFileUpload = (props) => {
  const context = useContext(articleContext);
  const { uploadFile, article, setArticle,selectedFile,setSelectedFile } = context;
  const pdfUrl=props.pdfUrl;
  const handlePdfFileUpload =async  () => {
    const fileInput = document.querySelector("#my-pdf-input");
    let pdfFile_id = await uploadFile(fileInput)
    setArticle({...article, pdfFile: pdfFile_id});
    console.log(article)
  };

  return (
    <div className="pdf-file-upload">
    <div >
    </div>

      <br />

      <br />
      <div className="d-flex flex-column my-1 pdf-btn">
      {selectedFile && <div className="p-1">
      <a target='__blank' href={URL.createObjectURL(selectedFile)}>
        <img src={process.env.PUBLIC_URL + '/otherIcons/pdf.png'} alt="" className="pdf-logo mx-1"/>
      {selectedFile.name}
      </a>
      </div>}
      {!selectedFile && pdfUrl && <div className="p-1">
      <a target='__blank' href={pdfUrl}>
        <img src={process.env.PUBLIC_URL + '/otherIcons/pdf.png'} alt="" className="pdf-logo mx-1"/>
      {'selectedFile.name'}
      </a>
      </div>}

      {!selectedFile && !pdfUrl && <label htmlFor="my-pdf-input" className="btn">Choose File</label>}
      <input
        type="file"
        name="myPdf"
        className="d-none"
        id="my-pdf-input"
        onChange={(event) => {
          setSelectedFile(event.target.files[0]);
        }
        }
      />
      </div>
      {selectedFile && <a onClick={() => setSelectedFile(null)} className="btn">Remove</a>}
      {!selectedFile && pdfUrl && <label htmlFor="my-pdf-input" className="my-2 chooseLabel btn  w-100">Change File</label>}
      {!selectedFile && <a onClick={() =>{
        setArticle({...article, pdfFile: null})
        props.setPdfUrl(null)
      }} className="btn">Remove</a>}
      <a onClick={handlePdfFileUpload} className={`btn btn-primary mx-1 ${selectedFile?"":"disabled"}`}>Upload</a>
      {article.pdfFile && <label htmlFor="">File Uploaded</label>}
    </div>
  );
};

export default PdfFileUpload;
