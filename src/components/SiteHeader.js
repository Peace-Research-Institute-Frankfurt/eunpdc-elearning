import React, { useState } from "react";
import { Link } from "gatsby";
import Icon from "../assets/favicon.svg";
import Tooltip from "./Tooltip";
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
        <Link className={styles.logo} to="/">
          <img src={Icon} alt="" />
          EUNPDC E-Learning
        </Link>
        <Link to="/" className={styles.navigationItem}>
          Unit {unit}
        </Link>
        {chapter && <span className={styles.navigationItem}>{chapter}</span>}
      </nav>
      <div className={styles.tools}>
        <div className={styles.bookmarksContainer}>
          <button className={styles.bookmarksToggle} onClick={toggleBookmarks}>
            Bookmarks
            <span className={styles.buttonCounter}>{bookmarkItems.length}</span>
          </button>
          <Tooltip position="bottom-left" arrow="top-right" active={showBookmarks}>
            <ul className={`${styles.bookmarks} ${showBookmarks ? styles.bookmarksActive : ""}`}>{bookmarkItems}</ul>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}
