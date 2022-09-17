import React, { useContext, useEffect } from "react";
import Items from "./items";
import articleContext from "../../../context/articles/articleContext";
import { Link } from "react-router-dom";
import Banner from "../banner/banner";
import Spinner from "../../../shared/spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import categoriesContext from "../../../context/categories/categoriesContext";

export default function ItemsContainer(props) {
  const context = useContext(articleContext);
  const {
    articles,
    fetchArticleByCategory,
    setLoading,
    setArticles,
    fetchMoreData,
    count,
    isSearch,
    fetchMoreArticleBySearch,
    searchString,
  } = context;
  const contextCategory = useContext(categoriesContext);
  const { categories, fetchCategories } = contextCategory;


  useEffect(() => {
    setLoading(true);
    setArticles([]);
    fetchArticleByCategory(props.ofType, props.category);
    fetchCategories()
  }, [props.category]);


  let categoryName;
    categories.map((category) => {
      if (category._id === props.category) {
        categoryName = category.name;
      }
    });

  return (
    <div className="d-flex justify-content-centre w-100">
      <div className="d-flex flex-column p-4 w-100 item-container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {(props.category || props.ofType !== "news") && (
              <li className="breadcrumb-item ">
                <Link to="/news/all">Home</Link>
              </li>
            )}
            {(!props.category && props.ofType !== "news") && (
              <li className="breadcrumb-item active" aria-current="page">
              {props.ofType && props.ofType.charAt(0).toUpperCase() + props.ofType.slice(1)} 
              </li>
            )}
            {(props.category ) && (
              <li className="breadcrumb-item" aria-current="page">
              <Link to={`/${props.ofType}/all`}>{props.ofType && props.ofType.charAt(0).toUpperCase() + props.ofType.slice(1)} </Link>
              </li>
            )}
            {props.category && (
              <li className="breadcrumb-item active" aria-current="page">
                {categoryName} 
              </li>
            )}
          </ol>
        </nav>
        {isSearch && articles.length > 0 && (
          <div className="mx-3 my-2">Results of "{searchString}" are</div>
        )}
        {articles.length > 0 ? (
          <InfiniteScroll
            dataLength={articles.length} //This is important field to render the next data
            next={() => {
              isSearch
                ? fetchMoreArticleBySearch(searchString)
                : fetchMoreData(props.ofType, props.category);
            }}
            hasMore={articles.length !== count}
            loader={<Spinner />}
          >
            {articles.map((element, index) => {
              return (
                <React.Fragment key={element._id}>
                  {
                    <div>
                      {/* <div>`${index}`</div> */}
                      {index === 0 && props.ofType === "news" ? (
                        <Banner
                          id={element._id}
                          title={element.title}
                          description={element.subtitle}
                          image={
                            element.cover_img
                              ? element.cover_img.images[0].location
                              : ""
                          }
                          category={element.category}
                          date={element.createdAt}
                        />
                      ) : (
                        <Items
                          id={element._id}
                          title={element.title}
                          ofType={element.ofType}
                          description={element.subtitle}
                          image={
                            element.cover_img
                              ? element.cover_img.images[0].location
                              : ""
                          }
                          category={element.category}
                          date={element.createdAt}
                          content={element.description}
                          views={element.views}
                        />
                      )}
                    </div>
                  }
                </React.Fragment>
              );
            })}
          </InfiniteScroll>
        ) : (
          "No results found"
        )}
      </div>
    </div>
  );
}
