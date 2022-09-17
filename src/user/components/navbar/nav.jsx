import { useContext, useEffect } from "react";
import Footer from "../Footer/footer";
import { Link, NavLink, useNavigate,useLocation } from "react-router-dom";
import articleContext from "../../../context/articles/articleContext";
import "./nav.css";
function Nav() {
  const location = useLocation()
  const context = useContext(articleContext);
  const { fetchArticleBySearch, setSearchString, ofType } = context;
  const pathArray = location.pathname.split("/")
  const navigate = useNavigate();
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-light sticky-top"
        id="primaryNavbar"
      >
        <div className="container-fluid">
          <label
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </label>
          <Link className="navbar-brand" to="/">
            <img src={process.env.PUBLIC_URL + "/vibrant.png"} alt="" />
          </Link>
          <span>
            <button
              onClick={() => {
                document.getElementById("primaryNavbar").style.display = "none";
                document.getElementById("searchNavbar").style.display = "flex";
              }}
              id="toggleSearchNavbar"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </span>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <form
                className="d-flex searchBar"
                method="GET"
                action="/"
                onSubmit={async (event) => {
                  event.preventDefault();
                  setSearchString(event.target.searchBox.value);
                  await navigate("/" + ofType+'/search');
                  await fetchArticleBySearch(event.target.searchBox.value);
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
              <div className="tabs">
                {/* <li className="tabs-client nav-item d-flex align-items-center">
                  <NavLink className={`nav-link ${pathArray[1]==='news'?'active':'inactive'}`} to="/news/">
                    <i className="fa-regular fa-newspaper"></i> News
                  </NavLink>
                </li>
                <li className="tabs-client nav-item d-flex align-items-center ">
                  <NavLink className={`nav-link ${pathArray[1]==='videos'?'active':'inactive'}`} to="/videos/all">
                    <i className="fa-brands fa-youtube"></i> Videos
                  </NavLink>
                </li>
                <li className="tabs-client nav-item d-flex align-items-center">
                  <NavLink className={`nav-link ${pathArray[1]==='activities'?'active':'inactive'}`} to="/activities/all">
                  <i className="fa-solid fa-hands-holding-child"></i> Activities
                  </NavLink>
                </li>
                <li className="tabs-client nav-item align-items-center mobile-tabs ">
                  <NavLink className="nav-link" to="/aboutUs/all">
                    <i className="fa-solid fa-users"></i> About Us
                  </NavLink>
                </li>
                <li className="tabs-client nav-item d-flex align-items-center mobile-tabs">
                  <NavLink className="nav-link" to="/projects/all">
                  <i className="fa-solid fa-bars-progress"></i>{" "}
                    Projects
                  </NavLink>
                </li>
                <li className="tabs-client nav-item d-flex align-items-center mobile-tabs">
                  <NavLink className="nav-link" to="/publications/all">
                  <i className="fa-regular fa-file-lines"></i> {" "}
                    Publications
                  </NavLink>
                </li> */}
                <li className="tabs-client nav-item d-flex align-items-center">
                  <NavLink className="nav-link" to="/aboutus">
                  <i className="fa-solid fa-user"></i> {" "}
                    About Us
                  </NavLink>
                </li> 
                {/* <div className="our-services-mobile"></div> */}
              </div>
            </ul>
            <div className="footer-mobile">
              <Footer />
            </div>
          </div>
        </div>
      </nav>
      <nav
        className="navbar navbar-expand-lg bg-light sticky-top"
        id="searchNavbar"
        style={{ display: "none" }}
      >
      <button
          onClick={() => {
            document.getElementById("primaryNavbar").style.display = "flex";
            document.getElementById("searchNavbar").style.display = "none";
          }}
          id="toggleSearchNavbarClose"
        >
          {/*<i className="fa-solid fa-xmark"></i>*/}
          <i className="fa-solid fa-arrow-left" style={{fontSize: "25px"}}></i>
        </button>
        <form
          className="d-flex searchBar"
          method="GET"
          action="/"
          onSubmit={(event) => {
            event.preventDefault();
                  setSearchString(event.target.searchBox.value);
                  navigate("/" + ofType+'/search');
                  fetchArticleBySearch(event.target.searchBox.value);
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
        
      </nav>
    </>
  );
}

export default Nav;
