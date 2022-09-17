import React, { useContext, useEffect,useState } from "react";
import { useParams, Link ,useHistory} from "react-router-dom";
import articleContext from "../../../context/articles/articleContext";
import Spinner from "../../../shared/spinner";
import "./articles.css";
import categoriesContext from "../../../context/categories/categoriesContext";
export default function CreateArticle(props) {
  const { id } = useParams();
  const context = useContext(articleContext);
  const { articles, fetchArticleById, loading } = context;
  const contextCategory = useContext(categoriesContext);
  const { fetchCategories,categories } = contextCategory;
  // var articles=[];
  var title,
    description,
    content,
    createdDate,
    category,
    categoryName,
    noSpacesName,
    // time,
    author,
    ofType,
    updatedDate,
    acceptedDate,
    receivedDate,
    revisedDate,
    pdfFile,
    imageUrl = "";
  useEffect(() => {
    fetchArticleById(id);
    fetchCategories();
    window.scrollTo(0, 0);
  }, []);
//  const [categoryName,setCategoryName]=useState('')
  articles.map((element, index) => {
    if (element._id === id && articles.length === 1) {
      createdDate = new Date(element.createdAt).toLocaleDateString('en-GB');
      updatedDate = new Date(element.updatedAt).toLocaleDateString('en-GB');
      // time = new Date(element.createdAt).toTimeString();
      title = element.title;
      category = element.category;
      categories.map((singleCategory)=>{
        if(singleCategory._id===category){
          categoryName=singleCategory.name
          noSpacesName= singleCategory.name.replace(" ", "");
        }
      })
      description = element.subtitle;
      content = element.description;
      ofType = element.ofType;
      author = element.author;
      imageUrl = element.cover_img ? element.cover_img.images[0].location : "";
      pdfFile = element.pdfFile ? element.pdfFile.images[0].location : "";
      if(element.acceptedDate){
        acceptedDate = new Date(element.acceptedDate).toLocaleDateString('en-GB');
      }
      if(element.receivedDate){
        receivedDate = new Date(element.receivedDate).toLocaleDateString('en-GB');
      }
      if(element.revisedDate){
        revisedDate = new Date(element.revisedDate).toLocaleDateString('en-GB');
      }
    }
    return element._id === id ? (title = element.title) : "";
  });

  return (
    <div>
      <div className="articles__left">
        {loading && <Spinner />}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mt-5 mb-0 desktop">
            {ofType !== "news" && (
              <li className="breadcrumb-item ">
                <Link to="/news/all">Home</Link>
              </li>
            )}
            {ofType && (
              <li className="breadcrumb-item ">
                <Link to={`/${ofType}/all`}>
                  {ofType.charAt(0).toUpperCase() + ofType.slice(1)}
                </Link>
              </li>
            )}
            {category && (
              <li className="breadcrumb-item ">
                <Link to={`/${ofType}/${noSpacesName}`}>{categoryName}</Link>
              </li>
            )}
            {title && (
              <li className="breadcrumb-item active" aria-current="page">
                {title.length > 70 ? title.slice(0, 70) + "..." : title}
              </li>
            )}
          </ol>
        </nav>
        <nav aria-label="breadcrumb ">
          <ol className="breadcrumb mt-3 mb-2 mobile">
            {ofType !== "news" && (
              <li className="breadcrumb-item ">
                <Link to="/news">Home</Link>
              </li>
            )}
            {ofType && (
              <li className="breadcrumb-item ">
                <Link to={`/${ofType}`}>
                  {ofType.charAt(0).toUpperCase() + ofType.slice(1)}
                </Link>
              </li>
            )}
            {category && ofType !== "projects" && (
              <li className="breadcrumb-item ">
              <Link to={`/${ofType}/${noSpacesName}`}>{categoryName}</Link>
              </li>
            )}
            {title && (
              <li className="breadcrumb-item active" aria-current="page">
                {title.length > 30 ? title.slice(0, 30) + "..." : title}
              </li>
            )}
          </ol>
        </nav>
        <div className="article-title">{title}</div>
        {/* {author.map((singleAuthor)=>{return <div >"Hi"</div>})} */}
        {author && author.length > 0 && (
          <div className="article-author-text d-flex">
            Published by &nbsp;
            <div className="article-author-name">{author.join(", ")}</div>{" "}
          </div>
        )}
        <div className="article-date-container d-flex align-items-center">
          {ofType === "publications" && receivedDate && receivedDate !== "Invalid Date" && (
            <div className="d-flex align-items-center article-single-date ">
              {" "}
              Received : 
              <div className="article-date"> &nbsp; {receivedDate} &nbsp;</div>
            </div>
          )}
          {ofType === "publications" && revisedDate && revisedDate !== "Invalid Date" && (
            <div className="d-flex align-items-center article-single-date">
              <span className="article-date-separator">&nbsp; / &nbsp;</span>
              {" "}
              Revised :&nbsp;
              <div className="article-date"> {revisedDate} </div>
            </div>
          )}
          {ofType === "publications" && acceptedDate && acceptedDate !== "Invalid Date" && (
            <div className="d-flex align-items-center article-single-date">
              <span className="article-date-separator"> &nbsp; / &nbsp;</span>
              {" "}
              Accepted :&nbsp;
              <div className="article-date">{acceptedDate}</div>{" "}
            </div>
          )}
          {ofType === "activities" && acceptedDate && acceptedDate !== "Invalid Date" && (
            <div className="d-flex align-items-center article-single-date">
            <span className="article-date-separator">&nbsp;/&nbsp;</span>
              {" "}
              Event On :&nbsp;
              <div className="article-date">{acceptedDate}</div>{" "}
            </div>
          )}
          {ofType === "publications" && (
            <div className="d-flex align-items-center article-single-date">
            <span className="article-date-separator">&nbsp;/&nbsp;</span>
              {" "}
              Published :&nbsp;
              <div className="article-date">{createdDate}&nbsp;</div>
            </div>
          )}
          {createdDate === updatedDate && ofType === "news" && (
            <div className="article-date d-flex">
              Published on {createdDate}
            </div>
          )}
          {createdDate !== updatedDate && ofType === "news" && (
            <div className="article-date">Last Updated on {updatedDate}</div>
          )}
        </div>
        {ofType !== "videos" && (
          <div className="article-subtitle">{description}</div>
        )}
        <i class="fa-regular fa-share-from-square" onClick={navigator.clipboard.writeText(window.location.href)}></i>
        {imageUrl && ofType !== "videos" && (
          <div className="article-image d-flex justify-content-center">
            <img src={imageUrl} alt="" key={imageUrl} />
          </div>
        )}
        <div
          className="article-description"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        {pdfFile && ofType !== "videos" && (
            <a
              href={pdfFile}
              className="text-decoration-none mx-2"
              target="__blank"
            >
          <div className="file-link d-flex">
            <img
              src={process.env.PUBLIC_URL + "/otherIcons/pdf.png"}
              alt=""
              className="pdf-logo mx-1"
            />
              {title? (title.length >30? title.slice(0,30) + "..." : title):""}.pdf
          </div>
            </a>
        )}
      </div>
    </div>
  );
}
