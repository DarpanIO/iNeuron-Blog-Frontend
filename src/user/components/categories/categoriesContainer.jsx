import React from "react";
import CategoryCard from "./category-card";
import "./categories.css";
import {NavLink} from 'react-router-dom';
import categoriesContext from "../../../context/categories/categoriesContext";
import { useContext } from "react";
export default function CategoriesContainer(props) {

const ofType=props.ofType;

  const contextCategory= useContext(categoriesContext)
  const {categories} =contextCategory;
  return (
    <div className="category-container m-4">
    <div className="category-heading">
      Categories 
    </div>
      <hr className="category-hr"/>
      {ofType==='news' && <NavLink to={`/${ofType}/all`} style={{ textDecoration: 'none' }} className={(navData) => (navData.isActive ? "active-style" : 'none')}>
            <CategoryCard title={'Top '+ofType} imageUrl={process.env.PUBLIC_URL + "/categories/flame.svg"} />
      </NavLink>}
      {ofType==='videos' && <NavLink to={`/${ofType}/all`} style={{ textDecoration: 'none' }} className={(navData) => (navData.isActive ? "active-style" : 'none')}>
            <CategoryCard title={'All '+ofType} imageUrl={process.env.PUBLIC_URL + "/categories/youtube.svg"} />
      </NavLink>}
      {ofType==='activities' && <NavLink to={`/${ofType}/all`} style={{ textDecoration: 'none' }} className={(navData) => (navData.isActive ? "active-style" : 'none')}>
            <CategoryCard title={'All '+ofType} imageUrl={process.env.PUBLIC_URL + "/categories/activity.svg"} />
      </NavLink>}
      {ofType==='publications' && <NavLink to={`/${ofType}/all`} style={{ textDecoration: 'none' }} className={(navData) => (navData.isActive ? "active-style" : 'none')}>
            <CategoryCard title={'All '+ofType} imageUrl={process.env.PUBLIC_URL + "/otherIcons/file.svg"} />
      </NavLink>}
      {ofType==='projects' && <NavLink to={`/${ofType}/all`} style={{ textDecoration: 'none' }} className={(navData) => (navData.isActive ? "active-style" : 'none')}>
            <CategoryCard title={'All '+ofType} imageUrl={process.env.PUBLIC_URL + "/otherIcons/growth.svg"} />
      </NavLink>}
      {categories.map((element) => {
        let noSpacesName=element.name.replace(/\s/g, '')
        return (
          <div key={element._id}>
          {element.ofType===ofType && 
          <div className="" >
          <NavLink key={element.id} to={`/${ofType}/${noSpacesName}`} style={{ textDecoration: 'none' }} className={(navData) => (navData.isActive ? "active-style" : 'none')}>
            <CategoryCard title={element.name} imageUrl={element.logo?element.logo.images[0].location:""} />
          </NavLink>
          </div> }
          </div>

        );
        
      })}
    </div>
  );
}
