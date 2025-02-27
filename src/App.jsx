import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 5;
  const apiKey = import.meta.env.VITE_NEWS_API; 
  const [progress, setProgress] = useState(0);

  return (
    <Router> {/* Wrap everything inside Router */}
      <NavBar />
      <LoadingBar height={3} color="#f11946" progress={progress} />
      <Routes>
        <Route path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize}  category="general"/>} />
        <Route path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize}  category="general"/>} />
        <Route path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize}  category="business"/>} />
        <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize}  category="entertainment"/>} />
        <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize}  category="health"/>} />
        <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize}  category="science"/>} />
        <Route path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize}  category="sports"/>} />
        <Route path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize}  category="technology"/>} />
      </Routes>
    </Router>
  );
};

export default App;
