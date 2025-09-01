import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Component/Login/Login";
import Signup from "./Component/Signup/Signup";
import Navbar from "./Component/Navbar/Navbar";
import Home from "./Component/Home/Home";
import Movies from "./Component/Movies/Movies";
import Tv from "./Component/Tv/Tv";
import Bookmark from "./Component/Bookmark/Bookmark";
import { BookmarkProvider } from "./context/BookmarkContext";

const App = () => {
  return (
    <BookmarkProvider>
      <Router>
        <Routes>
          {/* Auth pages (no Navbar) */}
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Main app layout (with Navbar) */}
          <Route
            path="/*"
            element={
              <div className="app-layout">
                <Navbar />
                <div className="page-content">
                  <Routes>
                    <Route path="home" element={<Home />} />
                    <Route path="movies" element={<Movies />} />
                    <Route path="tv" element={<Tv />} />
                    <Route path="bookmark" element={<Bookmark />} />
                  </Routes>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </BookmarkProvider>
  );
};

export default App;
