import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import articleContext from "../../../context/articles/articleContext";
import "./adminnav.css";
function AdminNav() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const context = useContext(articleContext);
  const { setArticles, fetchArticleBySearch, setSearchString, ofType } =
    context;

  return (
    <>
      <nav className="adminnav navbar navbar-expand-lg bg-light sticky-top d-flex flex-column">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/admin">
            <img src={process.env.PUBLIC_URL + "/vibrant.png"} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-between w-100">
              <li className="nav-item">
                <form
                  className="d-flex searchBar"
                  method="GET"
                  action="/"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSearchString(event.target.searchBox.value);
                    navigate("/admin/dashboard/" + ofType);
                    fetchArticleBySearch(event.target.searchBox.value);
                    console.log(event.target.searchBox.value);
                  }}
                >
                  <button className="btn search-btn" type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                  <input
                    id="searchbox"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    name="searchBox"
                  />
                </form>
              </li>
              <li
                className="tabs-client nav-item d-flex align-items-center nav-link mx-0 px-0"
                onClick={handleLogOut}
              >
              <div className="tabs-client nav-item d-flex align-items-center mr-0 ml-1">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                &nbsp;Logout
                <span className="tabs-client nav-item d-flex align-items-center mr-0 ">
                  <NavLink className="nav-link" to="/admin/aboutus">
                    <i className="fa-solid fa-users"></i> About Us
                  </NavLink>
                  </span>
              </div>
              </li>

              {/* <div className="tabs tabs-desktop">
                <li className="tabs-client nav-item d-flex align-items-center">
                  <NavLink className="nav-link" to="/admin/dashboard/news">
                    <i className="fa-regular fa-newspaper"></i> News
                  </NavLink>
                </li>
                <li className="tabs-client nav-item d-flex align-items-center ">
                  <NavLink
                    className="nav-link"
                    to="/admin/dashboard/videos"
                  >
                    <i className="fa-solid fa-video"></i>{" "}
                    Videos
                  </NavLink>
                </li>
                <li className="tabs-client nav-item d-flex align-items-center ">
                  <NavLink
                    className="nav-link"
                    to="/admin/dashboard/activities"
                  >
                    <i className="fa-solid fa-hands-holding-child"></i>{" "}
                    Activities
                  </NavLink>
                </li>
                <li className="tabs-client nav-item d-flex align-items-center">
                  <NavLink
                    className="nav-link"
                    to="/admin/dashboard/publications"
                  >
                    <i className="fa-regular fa-file-lines"></i> Publications
                  </NavLink>
                </li>
                <li className="tabs-client nav-item d-flex align-items-center ">
                  <NavLink className="nav-link" to="/admin/dashboard/projects">
                    <i className="fa-solid fa-bars-progress"></i> Projects
                  </NavLink>
                </li>
                <li className="tabs-client nav-item d-flex align-items-center ">
                  <NavLink className="nav-link" to="/admin/aboutus">
                    <i className="fa-solid fa-users"></i> About Us
                  </NavLink>
                </li>
              </div> */}
            </ul>
          </div>
        </div>
      </nav>
      {/* <nav className="adminnav navbar navbar-expand-lg bg-light d-flex flex-column secondaryNavbar">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <div className="tabs">
                <li className="tabs-client nav-item d-flex align-items-center">
                  <NavLink className="nav-link" to="/admin/dashboard/news">
                    <i className="fa-regular fa-newspaper"></i> News
                  </NavLink>
                </li>
                <li className="tabs-client nav-item d-flex align-items-center">
                  <NavLink
                    className="nav-link"
                    to="/admin/dashboard/publications"
                  >
                    <i className="fa-regular fa-file-lines"></i> Publications
                  </NavLink>
                </li>
                <li className="tabs-client nav-item d-flex align-items-center ">
                  <NavLink className="nav-link" to="/admin/dashboard/videos">
                    <i className="fa-solid fa-video"></i> Videos
                  </NavLink>
                </li>
                <li className="tabs-client nav-item d-flex align-items-center ">
                  <NavLink className="nav-link" to="/admin/dashboard/projects">
                    <i className="fa-solid fa-bars-progress"></i> Projects
                  </NavLink>
                </li>
                <li className="tabs-client nav-item d-flex align-items-center ">
                  <NavLink
                    className="nav-link"
                    to="/admin/dashboard/activities"
                  >
                    <i className="fa-solid fa-hands-holding-child"></i>{" "}
                    Activities
                  </NavLink>
                </li>
                <li className="tabs-client nav-item d-flex align-items-center ">
                  <NavLink className="nav-link" to="/admin/aboutus">
                    <i className="fa-solid fa-users"></i> About Us
                  </NavLink>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav> */}
    </>
  );
}

export default AdminNav;
