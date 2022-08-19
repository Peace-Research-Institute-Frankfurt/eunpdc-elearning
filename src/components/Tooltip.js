import React from "react";
import * as styles from "./Tooltip.module.scss";

export default function Tooltip({ active, position, children, id }) {
  let containerClass = styles.tooltip;
  if (position === "bottom-left") {
    containerClass = styles.tooltipBottomLeft;
  }
  if (position === "top-center") {
    containerClass = styles.tooltipTopCenter;
  }
  return (
    <span id={id} role="tooltip" className={`${containerClass} ${active ? styles.active : ""}`}>
      <span className="content">{children}</span>
      <span className={styles.arrow}></span>
    </span>
  );
}
