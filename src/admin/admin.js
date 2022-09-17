import React, { useState, useContext } from "react";
import AddArticle from "./pages/article/addArticle";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import "./admin.css";
import AdminNav from "./components/adminnavbar/adminnav";
import UpdateArticle from "./pages/article/updateArticle";
import articleContext from "../context/articles/articleContext";
import AdminCategories from "./components/AdminCategories/adminCategories";
import AboutUs from "./pages/aboutUs/aboutUs";
import Alert from "./components/Alert/Alert";
import alertContext from "../context/Alert/alertContext";
export default function Admin() {
  const context = useContext(articleContext);
  const { ofType } = context;
  const contextAlert = useContext(alertContext);
  const { alert } = contextAlert;
  // const [ofTypeState, setOfTypeState] = useState("news")

  const [dashboardSideHidden, setDashboardSideHidden] = useState(true);

  return (
    <>
    <Alert alert={alert} />
      <AdminNav />
      <div className="admin-body d-flex ">
        <div style={{ display: dashboardSideHidden ? "" : "none" }}>
          <Link
            to="/admin/dashboard/addArticle"
            className="add-article-button-mobile"
          >
            <button><i className="fa-solid fa-plus"></i></button>
          </Link>
          <div className="dashboard-side-container">
            {/* {ofType && <h1>{ofType.charAt(0).toUpperCase() + ofType.slice(1)}</h1>} */}
            <h1>Blogs</h1>
            <Link to={`/admin/dashboard/addArticle`}>
              <button className="add-button my-2">+ New Post</button>
            </Link>
            <div className="my-2">
              <AdminCategories ofType={ofType} />
            </div>
          </div>
        </div>
        <Routes>
          <Route
            exact
            path="/*"
            element={<Navigate to="/admin/dashboard/news" />}
          />
          <Route
            exact
            path="/dashboard/addArticle/"
            element={
              <AddArticle
                ofType={ofType}
                setDashboardSideHidden={setDashboardSideHidden}
              />
            }
          />
          <Route
            exact
            path="/dashboard/updateArticle/:id"
            element={
              <UpdateArticle
                ofType={ofType}
                setDashboardSideHidden={setDashboardSideHidden}
                updateArticle={true}
              />
            }
          />
          <Route
            exact
            path="/dashboard/:ofType"
            element={
              <Dashboard setDashboardSideHidden={setDashboardSideHidden} />
            }
          />
          <Route
            exact
            path="/aboutus"
            element={
              <AboutUs setDashboardSideHidden={setDashboardSideHidden} />
            }
          />
        </Routes>
      </div>
    </>
  );
}
