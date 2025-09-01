import React, { useState } from "react";
import data from "../../data.json";
import "./Movies.css";
import movies from "../../assets/movies.svg";
import bookmark from "../../assets/bookmark.svg";
import search from "../../assets/search.svg";
import bookmarkempty from "../../assets/bookmarkempty.svg";
import { useBookmark } from "../../context/BookmarkContext";
import play from "../../assets/play.png";

const Movies = () => {
  const { isBookmarked, toggleBookmark } = useBookmark();
  const [searchValue, setSearchValue] = useState("");

  const allMovies = data.filter((item) => item.category === "Movie");

  const filteredMovies = allMovies.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="movies-page">
      <div className="movies-search-bar">
        <img src={search} alt="search" className="movies-search-icon" />
        <input
          type="text"
          placeholder="Search for movies"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <h2 className="movies-section-title">Movies</h2>

      <div className="movies-grid">
        {filteredMovies.map((item, index) => (
          <div key={index} className="movies-item">
            <div className="movies-thumbnail-wrapper">
              <img
                src={item.thumbnail.regular.large}
                alt={item.title}
                className="movies-thumbnail"
              />

              {/* Play overlay */}
              <div className="movie-play-overlay">
                <div className="movie-play-button">
                  <img src={play} alt="play" className="movie-play-icon" />
                  <span>Play</span>
                </div>
              </div>

              {/* Bookmark overlay */}
              <div
                className={`movies-bookmark-overlay ${
                  isBookmarked(item) ? "active" : ""
                }`}
                onClick={() => toggleBookmark(item)}
              >
                <img
                  src={isBookmarked(item) ? bookmark : bookmarkempty}
                  alt="bookmark"
                />
              </div>
            </div>

            <div className="movies-info">
              <p>
                {item.year} •{" "}
                <span className="movies-category">
                  <img src={movies} alt="movie" /> Movie
                </span>{" "}
                • {item.rating}
              </p>
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
