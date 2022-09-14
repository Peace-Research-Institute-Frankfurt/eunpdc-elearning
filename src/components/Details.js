import React, { useState } from "react";
import * as styles from "./Details.module.scss";

function Details({ summary, children }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    console.log("hi");
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

export { Details };
