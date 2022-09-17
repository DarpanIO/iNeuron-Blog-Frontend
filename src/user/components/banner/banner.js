import React from 'react'
import './banner.css'
import { Link } from "react-router-dom";
const Banner = (props) => {
    return (
      <div>
        <Link to={props.id} style={{ textDecoration: "none" }}>
          <div
            className="banner-container"
            style={{
              backgroundImage: `url(${props.image})`,
              backgroundSize: "cover",
            }}
          >
            <div className="banner-text-container">
              <div className="banner-title-container">{props.title}</div>
            </div>
          </div>
        </Link>
      </div>
    );
  };

export default Banner;