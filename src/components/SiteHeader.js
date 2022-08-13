import React from "react";
import { Link } from "gatsby";
import Icon from "../assets/favicon.svg";
import * as styles from "./SiteHeader.module.scss";

export default function SiteHeader(props) {
  return (
    <header className={styles.container}>
      <nav>
        <Link to="/">
          <img className={styles.logo} src={Icon} />
          EUNPDC E-Learning
        </Link>
        <Link to="/">Unit {props.unit}</Link>
        <span>{props.chapter}</span>
      </nav>
      <div className="tools">
        <button>Bookmarks</button>
        <button>Export</button>
      </div>
    </header>
  );
}
