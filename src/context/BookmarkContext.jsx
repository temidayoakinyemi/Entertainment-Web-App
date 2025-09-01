import React, { createContext, useState, useContext, useEffect } from "react";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (item) => {
    setBookmarks((prev) => {
      const exists = prev.find((b) => b.title === item.title);
      if (exists) {
        return prev.filter((b) => b.title !== item.title);
      }
      return [...prev, item];
    });
  };

  const isBookmarked = (item) =>
    bookmarks.some((b) => b.title === item.title);

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmark = () => useContext(BookmarkContext);
