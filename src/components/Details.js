import React, { useState } from "react";
import * as styles from "./Details.module.scss";

function DetailsGroup({ children }) {
  return <div className={styles.detailsGroup}>{children}</div>;
}

function Details({ summary, children, open }) {
  const [isOpen, setIsOpen] = useState(false || open);

  function toggleOpen() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  return (
    <details className={styles.container} open={isOpen}>
      <summary onClick={toggleOpen} className={styles.summary}>
        <span className={styles.summaryText}>{summary}</span>
      </summary>
      <div className={styles.body}>{children}</div>
    </details>
  );
}

export { Details, DetailsGroup };
