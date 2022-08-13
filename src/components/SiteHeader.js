import React from "react";
import { Link } from "gatsby";
import * as styles from "./SiteHeader.module.scss";

export default function SiteHeader(props) {
  return (
    <header className={styles.container}>
      <nav>
        <Link to="/">EUNPDC E-Learning</Link>
        <Link to="/">Unit {props.unit}</Link>
        <Link to="/">{props.chapter}</Link>
      </nav>
      <div className="tools">
        <button>Bookmarks</button>
        <button>Export</button>
      </div>
    </header>
  );
}
