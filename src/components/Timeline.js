import React, { useState } from "react";
import * as styles from "./Timeline.module.scss";

function Timeline(props) {
  const events = React.Children.map(props.children, (child) => {
    return React.cloneElement(child, {
      test: "I'm an injected prop",
    });
  });
  return (
    <div className={styles.container}>
      <span className={styles.line}></span>
      <ol>{events}</ol>
    </div>
  );
}
function Event({ date, title, collapsed, children }) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <li className={styles.event}>
      <div className={styles.eventDescription}>
        <div className={styles.eventHeader}>
          <div>
            <span className={styles.eventDate}>{date}</span>
            <h3 className={styles.eventTitle}>{title}</h3>
          </div>
          {/* {collapsed !== undefined && ( */}
          <button className={styles.eventToggle} onClick={handleToggle}>
            {isCollapsed ? "Expand" : "Collapse"}
          </button>
        </div>
        {!isCollapsed && <div className={styles.eventBody}>{children}</div>}
      </div>
    </li>
  );
}

export { Timeline, Event };
