import React from "react";
import * as styles from "./Tooltip.module.scss";

export default function ({ active, position, children }) {
  let containerClass = styles.tooltip;
  if (position === "bottom") {
    containerClass = styles.tooltipBottom;
  }
  return (
    <span role="tooltip" className={`${containerClass} ${active ? styles.active : ""}`}>
      {position}
      <span className="content">{children}</span>
      <span className={styles.arrow}></span>
    </span>
  );
}
