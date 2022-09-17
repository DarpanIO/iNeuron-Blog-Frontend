import React, { useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import articleContext from "../../../context/articles/articleContext";
import categoriesContext from "../../../context/categories/categoriesContext";

import "./ItemCards.css";
export default function ItemCards(props) {
  let context = useContext(articleContext);
  let contextCategory = useContext(categoriesContext);
  const { deleteArticle } = context;
  const article = props.article;
  const timestamp = article.createdAt;
  const date = new Date(timestamp).toLocaleDateString();
  const deleteArticleRef = useRef(null);
  const deleteArticleRefClose = useRef(null);

  const { categories, fetchCategories } = contextCategory;
  useEffect(() => {
    fetchCategories();
  }, []);
  let category;
    categories.map((projectCategory) => {
      if (projectCategory._id === article.category) {
        category = projectCategory.name;
      }
    });
  return (
    <div>
      <div
        className={`card mb-3 rounded-4 ${article.ofType} admin`}
        style={{ color: "black" }}
      >
        <div className="row g-0 d-flex justify-content-between align-items-center">
          {article.ofType === "videos" && (
            <div className="col-md-2 item-image-container">
              <div
                className="w-100 h-100 rounded-top"
                dangerouslySetInnerHTML={{ __html: article.description }}
              ></div>
            </div>
          )}
          <div
            className="card-content"
            style={{ width: article.image ? "" : "100%" }}
          >
            <div className="card-body">
              <h5 className="card-title">{article.title.length >100 ? article.title.slice(0, 100)+'...': article.title}</h5>
              <p className="card-description">
                {article.subtitle ? (article.subtitle.length >100 ? article.subtitle.slice(0, 100)+'...': article.subtitle) : ""}
              </p>
              <div className="card-text">
                <div className="d-flex justify-content-between">
                  <small className="text-muted">
                    {category && <div>{category.charAt(0).toUpperCase() + category.slice(1)}</div>}
                  </small>
                  {/* <small className="text-muted">{date}</small> */}
                  <div>
                    <small className="text-muted mx-2">
                      <img
                        className="item-image"
                        src={process.env.PUBLIC_URL + "/otherIcons/eye.svg"}
                        alt="Delete"
                      />
                      <span className="views-count">{article.views}</span>
                    </small>
                    <Link to={`/admin/dashboard/updateArticle/${article._id}`}>
                      <small className="text-muted">
                        <img
                          className="item-image mx-1"
                          src={process.env.PUBLIC_URL + "/otherIcons/pen.svg"}
                          alt="Update"
                        />
                      </small>
                    </Link>

                    <small
                      className="text-muted"
                      onClick={() => {
                        props.deleteArticleClick(article);
                        // deleteArticle(article._id);
                      }}
                    >


 
                      <img
                        className="item-image mx-1"
                        src={process.env.PUBLIC_URL + "/otherIcons/delete.svg"}
                        alt="Delete"
                      />
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {article.cover_img &&
            typeof article.cover_img !== "string" &&
            article.ofType !== "videos" && (
              <div className="col-md-2 item-image-container">
                <img
                  src={article.cover_img.images[0].location}
                  className="img-fluid rounded-3"
                  alt="..."
                />
              </div>
            )}
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
}
