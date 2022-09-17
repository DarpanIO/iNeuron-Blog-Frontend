import "./App.css";
import { useContext } from "react";
import User from "./user/user";
import ArticleState from "./context/articles/ArticleState";
import CategoryState from "./context/categories/CategoriesState";
import AlertState from "./context/Alert/AlertState";
import Login from "./admin/pages/login/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./admin/admin";
import Alert from "./admin/components/Alert/Alert";
import AboutState from "./context/aboutUs/AboutState";
function App() {
  return (
    <div className="App">
      <ArticleState>
        <CategoryState>
          <AboutState>
            <AlertState>
              <Router>
                <Routes>
                  <Route exact path="/admin/login" element={<Login />} />
                  <Route exact path="/admin/*" element={<Admin />} />
                  <Route exact path="/*" element={<User />} />
                </Routes>
              </Router>
            </AlertState>
          </AboutState>
        </CategoryState>
      </ArticleState>
    </div>
  );
}

export default App;
