import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RichTextInput from "../../components/richTextInput/richtextInput";
import "./addArticle.css";
import TagsInput from "../../components/TagsInput/TagsInput";
import articleContext from "../../../context/articles/articleContext";
import UploadAndDisplayImage from "../../components/UploadAndDisplayImage/UploadAndDisplayImage";
import PdfFileUpload from "../../components/pdfFileUpload/pdfFileUpload";
import categoriesContext from "../../../context/categories/categoriesContext";
import AuthorInput from "../../components/AuthorInput/AuthorInput";
import alertContext from "../../../context/Alert/alertContext";

export default function AddArticle(props) {
  const [articleState, setArticleState] = useState(props.ofType);
  props.setDashboardSideHidden(false);

  const context = useContext(articleContext);
  const {
    addArticle,
    article,
    setArticle,
    ofType,
    setOfType,
    setTags,
    setSelectedImage,
    setAuthor,
    setSelectedFile,
  } = context;
 let ofTypeCategory=[];
  const contextCategory = useContext(categoriesContext);
  const { categories } = contextCategory;
  const contextAlert = useContext(alertContext);
  const { showAlert } = contextAlert;

  useEffect(() => {
    categories.map((category)=>{
      if(category.ofType===ofType){
        ofTypeCategory.push(category);
      }
    })
    setArticle({
      title: "",
      subtitle: "",
      ofType: ofType,
      author: [],
      description: "",
      category: ofTypeCategory.length>0?ofTypeCategory[0]._id:'',
      photos: [],
      cover_img: null,
      subcategory: "",
      tags: [],
    });
    setTags([]);
    setAuthor([]);
  }, [ofType]);
  const [imageUrl, setImageUrl] = useState(null)
  const [pdfUrl, setPdfUrl] = useState(null)
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleSubmitClick = async (event) => {
    event.preventDefault();
    await setArticle({ ...article, ofType: ofType });
    await addArticle(article);
    showAlert("Article Added", "success");
    setArticle({
      title: "",
      subtitle: "",
      ofType: ofType,
      author: [],
      description: "",
      category: "",
      photos: [],
      cover_img: null,
      pdfFile: null,
      subcategory: "",
      tags: [],
    });
    setSelectedImage(null);
    setSelectedFile(null);
    setTags([]);
    setAuthor([]);
    setImageUrl(null)
    setPdfUrl(null)
  };
  const onChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };
  return (
    <div className="w-100">
      <label className="p-2">
        Type of Article
        <select
          className="mx-2"
          onChange={(e) => {
            const selectedArticle = e.target.value;
            setArticleState(selectedArticle);
            setArticle({ ...article, ofType: e.target.value });
            setOfType(e.target.value)
          }}
          value={articleState}
        >
          <option value="news">News</option>
          <option value="publications">Publications</option>
          <option value="videos">Videos</option>
          <option value="activities">Activities</option>
          <option value="projects">Projects</option>
        </select>
        <span className="typeAlertText">
        (Important: Entered data will lost by changing the type of Article)
        </span>
      </label>
      <div>
        <ArticleForm
          className="d-flex flex-row add-article-body"
          ofType={articleState}
          article={article}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          pdfUrl={pdfUrl}
          setPdfUrl={setPdfUrl}
          onChange={onChange}
          handleSubmit={handleSubmit}
          handleSubmitClick={handleSubmitClick}
        />
      </div>
    </div>
  );
}

export function ArticleForm(props) {
  const contextCategory = useContext(categoriesContext);
  const { categories } = contextCategory;
  let article = props.article;
  const onChange = props.onChange;
  const handleSubmit = props.handleSubmit;
  const handleSubmitClick = props.handleSubmitClick;

  const navigate=useNavigate();

  const selectedTags = (tags) => {
    console.log(tags);
  };
  return (
    <form action="" method="post" onSubmit={handleSubmit}>
      <div className="d-flex flex-row add-article-main-form-container">
        <div className="left-container-admin d-flex flex-column">
          <input
            type="text"
            name="title"
            id="title"
            onChange={onChange}
            value={article.title}
            placeholder="Enter Title here (Required)"
            className="m-2 input-border article-title-admin input"
          />
          {props.ofType != "videos" && (
            <textarea
              placeholder="Enter Sub-Title here"
              name="subtitle"
              value={article.subtitle}
              onChange={onChange}
              className="article-subtitle-admin m-2 input-border input"
              rows="2"
            />
          )}
          <div
            className={`description-area-admmin m-2 input-border ${props.ofType}`}
          >
            <RichTextInput
              name="description"
              value={article.description}
              onChange={onChange}
              article={article}
            />
          </div>
        </div>
        <div className="right-container-admin d-flex flex-column m-4 p-2">
          <div
            className={`btn publish-button ${!article.ofType && "disabled"} ${
              !article.description && "disabled"
            } ${!article.title && "disabled"}`}
            onClick={handleSubmitClick}
          >
            <a className={`publish-button`}>Publish</a>
          </div>

          {props.ofType !== "videos" && (
            <UploadAndDisplayImage
              article={article}
              value={article.coverImage}
              name="coverImage"
              imageUrl={props.imageUrl}
              setImageUrl={props.setImageUrl}
            />
          )}

          {props.ofType !== "videos" && (
            <PdfFileUpload
              article={article}
              value={article.coverImage}
              name="coverImage"
              pdfUrl={props.pdfUrl}
              setPdfUrl={props.setPdfUrl}
            />
          )}

          <div className="my-2">
            AUTHOR
            <AuthorInput selectedTags={selectedTags} tags={[]} name="author" />
          </div>
          {props.ofType === "publications" && (
            <div className="date-received-date-admin-container my-2">
              Received Date
              <input
                type="date"
                name="receivedDate"
                className="w-100"
                id=""
                onChange={onChange}
                value={article.receivedDate}
              />
            </div>
          )}
          {props.ofType === "publications" && (
            <div className="date-received-date-admin-container my-2">
              Accepted Date
              <input
                type="date"
                name="acceptedDate"
                className="w-100"
                id=""
                onChange={onChange}
                value={article.acceptedDate}
              />
            </div>
          )}
          {props.ofType === "publications" && (
            <div className="date-received-date-admin-container my-2">
              Revised Date
              <input
                type="date"
                name="revisedDate"
                className="w-100"
                id=""
                onChange={onChange}
                value={article.revisedDate}
              />
            </div>
          )}
          {props.ofType === "activities" && (
            <div className="date-received-date-admin-container my-2">
              Event Date
              <input
                type="date"
                name="acceptedDate"
                className="w-100"
                id=""
                onChange={onChange}
                value={article.acceptedDate}
              />
            </div>
          )}

          <div className={`my-2 ${props.ofType === "activities" && "d-none"}`}>
            CATEGORY
            <select
              className="w-100"
              name="category"
              onChange={onChange}
              value={article.category}
            >
              {categories.map((element) => {
                if (element.ofType === props.ofType) {
                  return (
                    <option value={element._id} key={element._id}>
                      {element.name}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <div className="my-2">
            SUB CATEGORY
            <input
              type="text"
              name="subcategory"
              placeholder="Enter Sub category here"
              className=" input-border article-title-admin input w-100"
              onChange={onChange}
              value={article.subcategory}
            />
          </div>
          <div className="my-2">
            Tags
            <TagsInput selectedTags={selectedTags} tags={[]} name="tags" />
          </div>
        </div>
      </div>
    </form>
  );
}
