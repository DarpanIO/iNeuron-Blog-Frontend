import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import articleContext from "../../../context/articles/articleContext";
import Spinner from "../../../shared/spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import ItemCards from "../../components/ItemCards/ItemCards";
const Dashboard = (props) => {
  const deleteArticleRef = useRef(null);
  const deleteArticleRefClose = useRef(null);
  //Using Context API to fetch Article
  const context = useContext(articleContext);
  const {
    articles,
    fetchArticleByCategory,
    setOfType,
    setLoading,
    setArticles,
    fetchMoreData,
    count,
    isSearch,
    fetchMoreArticleBySearch,
    searchString,
    deleteArticle,
  } = context;

  const [article, setArticle] = useState({});
  const navigate = useNavigate();
  //Getting ofType state for : News , Publications and videos
  const { ofType } = useParams();
  useEffect(() => {
    props.setDashboardSideHidden(true);
    setOfType(ofType);
    if (localStorage.getItem("token")) {
      fetchArticleByCategory(ofType, "");
    } else navigate("/admin/login");
  }, [ofType]);

  const deleteArticleClick = (currentArticle) => {
    setArticle(currentArticle);
    deleteArticleRef.current.click();
  };
  const handleDeleteModalClick = () => {
    deleteArticle(article._id);
    // console.log(article)
    deleteArticleRefClose.current.click();
  };
  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        ref={deleteArticleRef}
        data-bs-target="#deleteArticleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="deleteArticleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Article
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete{" "}
              {article.title > 20
                ? article.title.slice(0, 20) + "..."
                : article.title}
              ?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={deleteArticleRefClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleDeleteModalClick}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`main-admin-item-container mx-5 w-100 ${ofType}`}>
        {isSearch && articles.length > 0 && (
          <div>Results of "{searchString}" are</div>
        )}
        {articles.length > 0 ? (
          <InfiniteScroll
            dataLength={articles.length} //This is important field to render the next data
            next={() => {
              isSearch
                ? fetchMoreArticleBySearch(searchString)
                : fetchMoreData(ofType, "");
            }}
            hasMore={articles.length !== count}
            loader={<Spinner />}
          >
            {articles.map((article) => {
              return (
                <ItemCards
                  key={article._id}
                  article={article}
                  deleteArticleClick={deleteArticleClick}
                />
              );
            })}
          </InfiniteScroll>
        ) : (
          "No results found"
        )}
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
