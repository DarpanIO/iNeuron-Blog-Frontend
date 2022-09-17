import React, { useState } from "react";
import ArticleContext from "./articleContext";


const ArticleState = (props) => {
  const host = "http://localhost:4000";
  // const host = "http://192.168.1.6:4000";
  const articlesInitial = [];
  const pageSize = 10;
  const [articles, setArticles] = useState(articlesInitial);
  const [page, setPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [singleArticle, setSingleArticle] = useState("Initial");
  const [progress, setProgress] = useState(0);
  const [ofType, setOfType] = useState("news");
  const [isSearch, setIsSearch] = useState(false);
  const [searchString, setSearchString] = useState("");

  const [article, setArticle] = useState({
    title: "",
    subtitle: "",
    ofType: ofType,
    author: [],
    description: "",
    category: "",
    photos: [],
    cover_img: null,
    pdfFile: null,
    subcategory: "",
    tags: [],
  });

  const [selectedImage,setSelectedImage]=useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [tags,setTags]=useState(article.tags);
  const [author,setAuthor]=useState(article.author);

  //Adding Article
  const addArticle = async (content) => {
    const response = await fetch(`${host}/api/post/addpost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(content),
    });
    // console.log(content);
    const article = await response.json();
    setArticles(articles.concat(article));
  };

  //Fetching Article by OfType
  const fetchArticleOfType = async (ofType) => {
    const response = await fetch(`${host}/is/${ofType} `, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    // console.log(json)
    setArticles(json.getSpecificArticle);
  };

  //Fetching Article by Category
  const fetchArticleByCategory = async (ofType, category) => {
    setIsSearch(false);
    setLoading(true);
    setProgress(10);
    const response = await fetch(
      `${host}/r?page=1&pagesize=${pageSize}&ofType=${ofType}&category=${category} `,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setProgress(70);
    const json = await response.json();
    setLoading(false);
    setPage(1);
    setArticles(json.articles);
    setCount(json.count);
    setProgress(100);
    // return json.articles
  };
  //Next
  const fetchMoreData = async (ofType, category) => {
    // if(!(page+1>Math.ceil(count/pageSize))){
    setPage(page + 1);
    setLoading(true);
    const response = await fetch(
      `${host}/r?page=${
        page + 1
      }&pagesize=${pageSize}&ofType=${ofType}&category=${category} `,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    setLoading(false);
    setArticles(articles.concat(json.articles));
    // }
  };

  //Prev
  const prevButton = async (ofType, category) => {
    const response = await fetch(
      `${host}/r?page=${
        page - 1
      }&pagesize=${pageSize}&ofType=${ofType}&category=${category} `,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    setPage(page - 1);
    setArticles(json.articles);
  };

  //Fetching Article by id
  const fetchArticleById = async (id) => {
    setLoading(true);
    setProgress(20);
    const response = await fetch(`${host}/id/${id} `, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setProgress(70);
    const json = await response.json();
    setArticles(json.getSpecificArticle)
    setLoading(false);
    setProgress(100);
    return json.getSpecificArticle
  };

  // Update Article
  const editArticle = async (article) => {
    // API Call
    const response = await fetch(`${host}/api/update/${article._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(article),
    });
    const json = response.json();
    //Logic to edit in client
    let newArticles = JSON.parse(JSON.stringify(articles));
    for (let index = 0; index < articles.length; index++) {
      const element = newArticles[index];
      if (element._id === article.id) {
        newArticles[index] = article;
        break;
      }
    }
    setArticles(newArticles);
  };

  const deleteArticle = async (_id) => {
    //TODO : API CAll
    const response = await fetch(`${host}/api/delete/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const newArticles = articles.filter((article) => {
      return article._id !== _id;
    });
    setArticles(newArticles);
  };

  //Fetching Article by Search
  const fetchArticleBySearch = async (searchString) => {
    setIsSearch(true);
    const response = await fetch(
      `${host}/api/search?ofType=${ofType}&page=1&pagesize=5&searchString=${searchString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    setCount(json.count);
    setArticles(json.Articles);
    window.scrollTo(0, 0);
  };
  //FetchingMore Article by Search
  const fetchMoreArticleBySearch = async (searchString) => {
    setIsSearch(true);
    setPage(searchPage + 1);
    const response = await fetch(
      `${host}/api/search?ofType=${ofType}&page=${
        searchPage + 1
      }&pagesize=5&searchString=${searchString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    setArticles(articles.concat(json.Articles));
  };

  // Upload File
  const uploadFile = async (fileInput) => {
    try {
      const formData = new FormData();
      formData.append("file", fileInput.files[0]);
      const response = await fetch(`${host}/coverimg/post`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: formData,
      });
      const result = await response.json();
      // console.log(result)
      return result._id;
    } catch (e) {
      console.log(e);
    }
  };

  const uploadFileGetUrl = async (fileInput) => {
    try {
      const formData = new FormData();
      formData.append("file", fileInput.files[0]);
      const response = await fetch(`${host}/coverimg/post`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: formData,
      });
      const result = await response.json();
      // console.log(result)
      return result.images[0].location;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ArticleContext.Provider
      value={{
        singleArticle,
        articles,
        setArticles,
        addArticle,
        fetchArticleOfType,
        fetchArticleByCategory,
        fetchMoreData,
        prevButton,
        page,
        fetchArticleById,
        editArticle,
        deleteArticle,
        fetchArticleBySearch,
        loading,
        setLoading,
        count,
        progress,
        ofType,
        setOfType,
        isSearch,
        setIsSearch,
        searchString,
        setSearchString,
        fetchMoreArticleBySearch,
        uploadFile,
        uploadFileGetUrl,
        article,
        setArticle,
        tags,
        setTags,
        selectedImage,
        setSelectedImage,
        author,
        setAuthor,
        selectedFile,
        setSelectedFile
      }}
    >
      {props.children}
    </ArticleContext.Provider>
  );
};

export default ArticleState;
