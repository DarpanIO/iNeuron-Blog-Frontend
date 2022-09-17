import React,{useContext,useEffect} from "react";
import "./ourServices.css";
import { NavLink, useNavigate } from "react-router-dom";
import categoriesContext from "../../../context/categories/categoriesContext";

const OurServices = () => {
  const context = useContext(categoriesContext)
  const {fetchCategories,categories}= context
  const navigate = useNavigate();
  useEffect(() => {
    fetchCategories()
  }, [])
  let noSpacesName;
  return (
    <div className="our-services m-4 mt-0 pt-4">
    <div className="category-heading">
      About Us 
    </div>
      <hr className="category-hr"/>
      <NavLink to="/aboutUs/all">
        <div className="ourServicesCards d-flex align-items-center p-2 rounded-4">
          <div className="our-services-cards-img-container">
            <img
              src={process.env.PUBLIC_URL + "/otherIcons/aboutus.svg"}
              alt=""
            />
          </div>
          <div className="our-services-title">Introduction</div>
        </div>
      </NavLink>


      <NavLink to="/publications/all">
        <div className="ourServicesCards d-flex align-items-center p-2 rounded-4">
          <div className="our-services-cards-img-container">
            <img
              src={process.env.PUBLIC_URL + "/otherIcons/file.svg"}
              alt=""
            />
          </div>
          <div className="our-services-title">Publications</div>
        </div>
      </NavLink>

      <NavLink to="/projects/all">
        <div className="ourServicesCards d-flex align-items-center p-2 rounded-4">
          <div className="our-services-cards-img-container">
            <img
              src={process.env.PUBLIC_URL + "/otherIcons/growth.svg"}
              alt=""
            />
          </div>
          <div className="our-services-title">Projects</div>
        </div>
      </NavLink>
    </div>
  );
};

export default OurServices;
