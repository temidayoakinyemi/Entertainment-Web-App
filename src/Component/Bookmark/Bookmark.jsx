import React, { useState } from "react";
import "./Bookmark.css";
import moviesIcon from "../../assets/movies.svg";
import tvIcon from "../../assets/tv.svg";
import search from "../../assets/search.svg";
import bookmark from "../../assets/bookmark.svg";
import bookmarkempty from "../../assets/bookmarkempty.svg";
import { useBookmark } from "../../context/BookmarkContext";
import play from "../../assets/play.png";

const Bookmark = () => {
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmark();
  const [searchValue, setSearchValue] = useState("");

  const bookmarkedMovies = bookmarks.filter(
    (item) =>
      item.category === "Movie" &&
      item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const bookmarkedTv = bookmarks.filter(
    (item) =>
      item.category === "TV Series" &&
      item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="bookmark">
      {/* Search bar */}
      <div className="bookmark-search">
        <img src={search} alt="search" />
        <input
          type="text"
          placeholder="Search for bookmarked shows"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {/* Movies Section */}
      <div className="bookmark-section">
        <h2>Bookmarked Movies</h2>
        <div className="bookmark-grid">
          {bookmarkedMovies.length === 0 ? (
            <p>No bookmarked movies.</p>
          ) : (
            bookmarkedMovies.map((item, index) => (
              <div key={index} className="bookmark-card">
                <div className="bookmark-thumb">
                  <img
                    src={item.thumbnail.regular.medium}
                    alt={item.title}
                    className="bookmark-img"
                  />

                  {/* Play overlay */}
                  <div className="bookmark-play-overlay">
                    <div className="bookmark-play-button">
                      <img
                        src={play}
                        alt="play"
                        className="bookmark-play-icon"
                      />
                      <span>Play</span>
                    </div>
                  </div>

                  {/* Bookmark overlay */}
                  <div
                    className="bookmark-overlay"
                    onClick={() => toggleBookmark(item)}
                  >
                    <img
                      src={isBookmarked(item) ? bookmark : bookmarkempty}
                      alt="bookmark toggle"
                    />
                  </div>
                </div>

                <div className="bookmark-info">
                  <p className="bookmark-meta">
                    {item.year} •{" "}
                    <span className="category">
                      <img src={moviesIcon} alt="movie icon" /> Movie
                    </span>{" "}
                    • {item.rating}
                  </p>
                  <h3 className="bookmark-title">{item.title}</h3>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* TV Section */}
      <div className="bookmark-section">
        <h2>Bookmarked TV Series</h2>
        <div className="bookmark-grid">
          {bookmarkedTv.length === 0 ? (
            <p>No bookmarked TV series.</p>
          ) : (
            bookmarkedTv.map((item, index) => (
              <div key={index} className="bookmark-card">
                <div className="bookmark-thumb">
                  <img
                    src={item.thumbnail.regular.medium}
                    alt={item.title}
                    className="bookmark-img"
                  />

                  {/* Play overlay */}
                  <div className="bookmark-play-overlay">
                    <div className="bookmark-play-button">
                      <img
                        src={play}
                        alt="play"
                        className="bookmark-play-icon"
                      />
                      <span>Play</span>
                    </div>
                  </div>

                  {/* Bookmark overlay */}
                  <div
                    className="bookmark-overlay"
                    onClick={() => toggleBookmark(item)}
                  >
                    <img
                      src={isBookmarked(item) ? bookmark : bookmarkempty}
                      alt="bookmark toggle"
                    />
                  </div>
                </div>

                <div className="bookmark-info">
                  <p className="bookmark-meta">
                    {item.year} •{" "}
                    <span className="category">
                      <img src={tvIcon} alt="tv icon" /> TV Series
                    </span>{" "}
                    • {item.rating}
                  </p>
                  <h3 className="bookmark-title">{item.title}</h3>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
