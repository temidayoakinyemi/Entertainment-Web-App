import React, { useState } from "react";
import data from "../../data.json";
import "./Home.css";
import movies from "../../assets/movies.svg";
import tv from "../../assets/tv.svg";
import bookmark from "../../assets/bookmark.svg";
import search from "../../assets/search.svg";
import bookmarkempty from "../../assets/bookmarkempty.svg";
import { useBookmark } from "../../context/BookmarkContext";
import play from "../../assets/play.png";

const Home = () => {
  const { isBookmarked, toggleBookmark } = useBookmark();
  const [searchValue, setSearchValue] = useState("");

  const trending = data.filter((item) => item.isTrending);
  const recommended = data.filter((item) => !item.isTrending);

  const filteredRecommended = recommended.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="home">
      {/* Search bar */}
      <div className="search-bar">
        <img src={search} alt="search" className="search-icon" />
        <input
          type="text"
          placeholder="Search for movies or TV series"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {/* Trending Section */}
      <h2 className="section-title">Trending</h2>
      <div className="trending">
        {trending.map((item, index) => (
          <div key={index} className="trending-card">
            <img
              src={item.thumbnail.trending.large}
              alt={item.title}
              className="trending-img"
            />

            {/* Play Overlay */}
            <div className="play-overlay-center">
              <div className="play-button">
                <img src={play} alt="play" className="play-icon" />
                <span>Play</span>
              </div>
            </div>

            {/* Bookmark */}
            <div
              className={`bookmark-overlay1 ${
                isBookmarked(item) ? "active" : ""
              }`}
              onClick={() => toggleBookmark(item)}
            >
              <img
                src={isBookmarked(item) ? bookmark : bookmarkempty}
                alt="bookmark"
              />
            </div>

            {/* Info */}
            <div className="trending-info">
              <p>
                {item.year} •{" "}
                <span className="category">
                  <img
                    src={item.category === "Movie" ? movies : tv}
                    alt={item.category}
                  />{" "}
                  {item.category}
                </span>{" "}
                • {item.rating}
              </p>
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Section */}
      <h2 className="section-title">Recommended for you</h2>
      <div className="recommended-grid">
        {filteredRecommended.map((item, index) => (
          <div key={index} className="recommended-item">
            <div className="recommended-thumb-wrapper">
              <img
                src={item.thumbnail.regular.medium}
                alt={item.title}
                className="recommended-thumb"
              />

              {/* Play Overlay */}
              <div className="play-overlay-center">
                <div className="play-button">
                  <img src={play} alt="play" className="play-icon" />
                  <span>Play</span>
                </div>
              </div>

              {/* Bookmark */}
              <div
                className={`bookmark-overlay1 ${
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

            {/* Info */}
            <div className="recommended-info">
              <p>
                {item.year} •{" "}
                <span className="category">
                  <img
                    src={item.category === "Movie" ? movies : tv}
                    alt={item.category}
                  />{" "}
                  {item.category}
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

export default Home;
