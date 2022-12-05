import React from "react";
import * as styles from "./LearningUnitHeader.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

export default function LearningUnitHeader({ image, alt, order, title, intro, startLink, background, bylines }) {
  const headerStyles = {
    // background: `linear-gradient(to right, ${background} 70%, transparent 100%)`,
    background: `linear-gradient(to right, ${background} 60%, transparent 100%)`,
  };
  return (
    <header className={styles.header}>
      <GatsbyImage className={styles.headerImage} image={image} alt={alt} />
      <div className={styles.headerCopy} style={headerStyles}>
        <div>
          <p className={styles.headerEyebrow}>Unit {order}</p>
          <h1 className={styles.headerTitle}>{title}</h1>
          <p className={styles.headerIntro}>{intro}</p>
          <Link className={styles.headerCta} to={startLink}>
            Start
          </Link>
        </div>
        <ul className={styles.headerBylines}>{bylines}</ul>
      </div>
    </header>
  );
}
