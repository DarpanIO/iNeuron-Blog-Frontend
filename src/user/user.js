import React,{useContext} from "react";
import News from "./pages/news";
import Publications from "./pages/publications";
import Videos from "./pages/videos";
import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/navbar/nav";
import LoadingBar from "react-top-loading-bar";
import articleContext from "../context/articles/articleContext";
import AboutUs from "./pages/aboutUs";
import Activities from "./pages/activities";
import Projects from "./pages/projects";

export default function User() {
  const context = useContext(articleContext);
  const { progress } = context;
  return (
    <div>
      <LoadingBar color="#EF4043" height={4} progress={progress} />
      <Nav />
      <div className="">
        <Routes>
          <Route exact path="/*" element={<Navigate to="/blogs/all" />} />
          <Route exact path="/news/*" element={<News />} />
          <Route exact path="/blogs/*" element={<News />} />
          <Route exact path="/publications/*" element={<Publications />} />
          <Route exact path="/videos/*" element={<Videos />} />
          <Route exact path="/aboutUs/*" element={<AboutUs />} />
          <Route exact path="/projects/*" element={<Projects />} />
          <Route exact path="/activities/*" element={<Activities />} />
        </Routes>
      </div>
    </div>
  );
}
