import React, { useState } from "react";
import data from "../../data.json";
import "./Tv.css";
import tv from "../../assets/tv.svg";
import bookmark from "../../assets/bookmark.svg";
import search from "../../assets/search.svg";
import bookmarkempty from "../../assets/bookmarkempty.svg";
import { useBookmark } from "../../context/BookmarkContext";
import play from "../../assets/play.png";

const Tv = () => {
  const { isBookmarked, toggleBookmark } = useBookmark();
  const [searchValue, setSearchValue] = useState("");

  const allTvSeries = data.filter((item) => item.category === "TV Series");

  const filteredTv = allTvSeries.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="tv-page">
      <div className="tv-search-bar">
        <img src={search} alt="search" className="tv-search-icon" />
        <input
          type="text"
          placeholder="Search for TV series"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <h2 className="tv-section-title">TV Series</h2>

      <div className="tv-grid">
        {filteredTv.map((item, index) => (
          <div key={index} className="tv-item">
            <div className="tv-thumbnail-wrapper">
              <img
                src={item.thumbnail.regular.large}
                alt={item.title}
                className="tv-thumbnail"
              />

              <div className="tv-play-overlay">
                <div className="tv-play-button">
                  <img src={play} alt="play" className="tv-play-icon" />
                  <span>Play</span>
                </div>
              </div>

              <div
                className={`tv-bookmark-overlay ${
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

            <div className="tv-info">
              <p>
                {item.year} •{" "}
                <span className="tv-category">
                  <img src={tv} alt="tv" /> TV Series
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

export default Tv;
