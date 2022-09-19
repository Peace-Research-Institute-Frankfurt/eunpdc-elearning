import React from "react";
import { useState } from "react";
import { useId } from "react";
import * as styles from "./Tabs.module.scss";

function Tab({ children, tabId, labelledBy, isActive }) {
  const activeClass = isActive ? styles.tabContentActive : "";
  return (
    <div className={`${styles.tabContent} ${activeClass}`} aria-labelledby={labelledBy} id={tabId}>
      {children}
    </div>
  );
}

function Tabs({ children }) {
  const baseId = useId();
  const [currentTab, setCurrentTab] = useState(0);
  function generateId(base, index) {
    return `${base}-${index}`;
  }

  function handleTabClick(e, i) {
    e.preventDefault();
    setCurrentTab(i);
  }

  const tabItems = React.Children.map(children, (c, i) => {
    const id = generateId(baseId, i);
    const isActive = currentTab === i;
    const activeClass = isActive ? styles.tabActive : "";
    return (
      <li className={`${styles.tab} ${activeClass}`}>
        <a onClick={(e) => handleTabClick(e, i)} aria-controls={id} href={`#${id}`} role="tab">
          {c.props.title}
        </a>
      </li>
    );
  });
  const tabContent = React.Children.map(children, (c, i) => {
    const props = {
      tabId: generateId(baseId, i),
      isActive: currentTab === i,
    };

    return React.cloneElement(c, props);
  });
  return (
    <div className={styles.container}>
      <ul className={styles.tabsList} role="tablist">
        {tabItems}
      </ul>
      <div className={styles.tabContentContainer}>{tabContent}</div>
    </div>
  );
}

export { Tab, Tabs };
