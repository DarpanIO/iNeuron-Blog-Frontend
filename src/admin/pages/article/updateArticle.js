import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import articleContext from "../../../context/articles/articleContext";
import alertContext from "../../../context/Alert/alertContext";
import { ArticleForm } from "./addArticle";

export default function UpdateArticle(props) {
  const { id } = useParams();
  let context = useContext(articleContext);
  const { articles, setArticle, fetchArticleById, editArticle } = context;
  useEffect(() => {
    setArticle({});
    fetchArticleById(id);
  }, []);
  if (articles.length === 1) {
    let article = articles[0];
    return (
      <UpdateArticleContainer
        article={article}
        setDashboardSideHidden={props.setDashboardSideHidden}
        editArticle={editArticle}
      />
    );
  }
}

const UpdateArticleContainer = (props) => {
  const editArticle = props.editArticle;
  const [articleState, setArticleState] = useState(props.article.ofType);
  const contextAlert = useContext(alertContext);
  const { showAlert } = contextAlert;
  props.setDashboardSideHidden(false);
  const cover_img_id = props.article.cover_img
    ? props.article.cover_img._id
    : "";

  const cover_img_Url = props.article.cover_img
    ? props.article.cover_img.images
    : "";

  const pdfFile_id = props.article.pdfFile ? props.article.pdfFile._id : "";
  const pdfFile_Url = props.article.pdfFile ? props.article.pdfFile.images : "";
  const context = useContext(articleContext);
  const { setArticle, article, setTags, setAuthor, setSelectedImage } = context;
  const newArticle = props.article;
  const [imageUrl, setImageUrl] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  useEffect(() => {
    setArticle(newArticle);
    if (cover_img_id) {
      newArticle.cover_img = cover_img_id;
      setImageUrl(cover_img_Url[0].location);
      setArticle(newArticle);
    }
    if (pdfFile_id) {
      newArticle.pdfFile = pdfFile_id;
      setPdfUrl(pdfFile_Url[0].location);
      setArticle(newArticle);
    }
    if (props.article.tags) {
      setTags(props.article.tags);
    }
    if (props.article.author) {
      setAuthor(props.article.author);
    }
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleSubmitClick = async (event) => {
    event.preventDefault();
    await editArticle(article);
    showAlert("Article Updated", "success");
  };

  const onChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };
  return (
    <div className="">
      <label className="p-2 d-none">
        Type of Article
        <select
          className="mx-2"
          onChange={(e) => {
            const selectedArticle = e.target.value;
            setArticleState(selectedArticle);
            setArticle({ ...article, ofType: e.target.value });
          }}
          value={articleState}
        >
          <option value="blogs">Blogs</option>
          <option value="news">News</option>
          <option value="publications">Publications</option>
          <option value="videos">Videos</option>
          <option value="activities">Activities</option>
          <option value="projects">Projects</option>
        </select>
      </label>
      <div>
        <ArticleForm
          className="d-flex flex-row add-article-body"
          ofType={articleState}
          article={article}
          imageUrl={imageUrl}
          pdfUrl={pdfUrl}
          onChange={onChange}
          handleSubmit={handleSubmit}
          handleSubmitClick={handleSubmitClick}
          setImageUrl={setImageUrl}
          setPdfUrl={setPdfUrl}
        />
      </div>
    </div>
  );
};
