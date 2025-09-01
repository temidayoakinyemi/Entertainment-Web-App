import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import movie from "../../assets/movie.png";
import home from "../../assets/home.svg";
import movies from "../../assets/movies.svg";
import tv from "../../assets/tv.svg";
import bookmark from "../../assets/bookmark.svg";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={movie} alt="Logo" />
        <div className="navbar-icons">
          <NavLink
            to="/home"
            className={({ isActive }) => `nav-icon ${isActive ? "active" : ""}`}
          >
            <img src={home} alt="Home" />
          </NavLink>

          <NavLink
            to="/movies"
            className={({ isActive }) => `nav-icon ${isActive ? "active" : ""}`}
          >
            <img src={movies} alt="Movies" />
          </NavLink>

          <NavLink
            to="/tv"
            className={({ isActive }) => `nav-icon ${isActive ? "active" : ""}`}
          >
            <img src={tv} alt="TV" />
          </NavLink>

          <NavLink
            to="/bookmark"
            className={({ isActive }) => `nav-icon ${isActive ? "active" : ""}`}
          >
            <img src={bookmark} alt="Bookmark" />
          </NavLink>
        </div>
      </div>
      <div className="nav-spacer"></div>

      <div
        className="nav-icon logout-icon"
        onClick={handleLogout}
        title="Logout"
      >
        <FiLogOut size={24} color="red" />
      </div>
    </div>
  );
};

export default Navbar;
