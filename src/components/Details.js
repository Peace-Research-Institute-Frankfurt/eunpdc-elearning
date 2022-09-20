import React, { useState } from "react";
import * as styles from "./Details.module.scss";

function DetailsGroup({ children }) {
  return <div className={styles.detailsGroup}>{children}</div>;
}

function Details({ summary, children }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  return (
    <details className={styles.container} open={false}>
      <summary onClick={toggleOpen} className={styles.summary}>
        {summary}
      </summary>
      <div className={styles.body}>{children}</div>
    </details>
  );
}

export { Details, DetailsGroup };
