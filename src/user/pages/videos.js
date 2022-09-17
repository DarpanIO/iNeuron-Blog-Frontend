import React, { useContext, useEffect } from "react";
import { Routes, Route ,Navigate} from "react-router-dom";
import CreateArticle from "./article/articles";
import ItemsContainer from "../components/items/itemsContainer";
import SearchItemsContainer from "../components/items/SearchItemsContainer";
import Sidebar from "../components/sidebar/sidebar";
import articleContext from "../../context/articles/articleContext";
import CategoriesContainer from "../components/categories/categoriesContainer";
import categoriesContext from "../../context/categories/categoriesContext";
import Sticky from "../components/sidebar/sticky";
export const Videos = () => {
  const context = useContext(articleContext);
  const { setOfType } = context;
  const contextCategory = useContext(categoriesContext);
  const { categories } = contextCategory;
  const ofType = "videos";
  useEffect(() => {
    setOfType("videos");
    Sticky();
  }, []);
  return (
    <div className="d-flex main-body videos">
      <div id="sidebar">
        <Sidebar ofType={ofType} />
      </div>
      <div className="" id="content">
        <div className="mobile">
          <CategoriesContainer ofType={ofType} />
        </div>
        <Routes>
        <Route
            exact
            path="/*"
            element={<Navigate to="/all" /> }
          />
          <Route
            exact
            path="/all"
            element={<ItemsContainer ofType={ofType} category="" />}
          />

          <Route exact path="/all/:id" element={<CreateArticle />} />
          <Route
            exact
            path="/search"
            element={<SearchItemsContainer ofType={ofType} category="" />}
          />
          <Route exact path="/search/:id" element={<CreateArticle />} />
          {categories.map((category) => {
            if (category.ofType === ofType) {
              let noSpacesName = category.name.replace(/\s/g, '');
              return (
                <Route
                  exact
                  path={`/${noSpacesName}`}
                  element={
                    <ItemsContainer ofType={ofType} category={category._id} />
                  }
                  key={category._id}
                />
              );
            }
          })}

          {categories.map((category) => {
            if (category.ofType === ofType) {
              let noSpacesName = category.name.replace(/\s/g, '');
              return (
                <Route
                  exact
                  path={`/${noSpacesName}/:id`}
                  element={<CreateArticle />}
                  key={category._id}
                />
              );
            }
          })}
        </Routes>
      </div>
      <div></div>
    </div>
  );
};

export default Videos;
