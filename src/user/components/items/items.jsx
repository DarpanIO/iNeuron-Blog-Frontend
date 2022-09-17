import React, { useContext, useEffect,useState,useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import categoriesContext from "../../../context/categories/categoriesContext";
import "./items.css";

export default function Items(props) {
  const timestamp = props.date;
  const date = new Date(timestamp).toLocaleDateString('en-GB');
  const contextCategory = useContext(categoriesContext);
  const { categories, fetchCategories } = contextCategory;
  useEffect(() => {
    fetchCategories();
  }, []);
  let category;
    categories.map((projectCategory) => {
      if (projectCategory._id === props.category) {
        category = projectCategory.name;
      }
    });
  
  return (
    <div>
      <Link to={props.id} style={{ textDecoration: "none" }}>
        <div
          className={`card mb-3 rounded-4 ${props.ofType}`}
          style={{ color: "black" }}
        >
          <div className="row g-0">
            {props.ofType === "videos" && (
              <div className="col-md-2 item-image-container">
                <div
                  className="w-100 h-100 rounded-top"
                  dangerouslySetInnerHTML={{ __html: props.content }}
                ></div>
              </div>
            )}
            <div
              className="card-content"
              style={{ width: props.image ? "" : "100%" }}
            >
              <div className="card-body">
                <h5 className="card-title">
                  {props.title.length > 70
                    ? props.title.slice(0, 70) + "..."
                    : props.title}
                </h5>
                {props.description && (
                  <p className="card-description">
                    {props.description.length > 190
                      ? props.description.slice(0, 190) + "..."
                      : props.description}
                  </p>
                )}
                <div className="card-text">
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">
                      {category}
                    </small>
                    <small className="text-muted">
                      {date}
                      <img
                        className="item-image"
                        src={process.env.PUBLIC_URL + "/otherIcons/eye.svg"}
                        alt="Delete"
                      />
                      <span className="views-count">{props.views}</span>
                    </small>
                  </div>
                </div>
              </div>
            </div>
            {props.image && props.ofType !== "videos" && (
              <div className="col-md-2 item-image-container">
                <img
                  src={props.image}
                  className="img-fluid rounded-3"
                  alt="..."
                />
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
