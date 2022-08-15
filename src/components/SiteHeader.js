import React, { useState } from "react";
import { Link } from "gatsby";
import Icon from "../assets/favicon.svg";
import * as styles from "./SiteHeader.module.scss";

export default function SiteHeader({ unit, chapter, bookmarks }) {
  const [showBookmarks, setShowBookmarks] = useState(false);
  let bookmarkItems = [];
  if (bookmarks) {
    bookmarkItems = bookmarks.map((b) => {
      return (
        <li key={b.slug}>
          <Link to={`../../${b.slug}`}>
            <span className={styles.bookmarkEyebrow}>{b.eyebrow}</span>
            <span className={styles.bookmarkTitle}>{b.title}</span>
          </Link>
        </li>
      );
    });
  }
  function toggleBookmarks() {
    setShowBookmarks((prev) => !prev);
  }
  return (
    <header className={styles.container}>
      <nav className={styles.navigation}>
        <Link to="/">
          <img className={styles.logo} src={Icon} alt="" />
          EUNPDC E-Learning
        </Link>
        <Link to="/">Unit {unit}</Link>
        <span>{chapter}</span>
      </nav>
      <div className="tools">
        <>
          <button className={styles.button} onClick={toggleBookmarks}>
            Bookmarks
            <span className={styles.buttonCounter}>{bookmarkItems.length}</span>
          </button>
          <ul className={`${styles.bookmarks} ${showBookmarks ? styles.bookmarksActive : ""}`}>{bookmarkItems}</ul>
        </>
      </div>
    </header>
  );
}
