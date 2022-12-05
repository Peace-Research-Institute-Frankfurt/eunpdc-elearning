import React, { cloneElement } from "react";
import { useState } from "react";
import * as styles from "./Tabs.module.scss";

function Tab({ children, tabId, labelledBy, isActive, key }) {
  const activeClass = isActive ? styles.tabContentActive : "";
  return (
    <div>This is a test tab element</div> 
    // <div key={key} className={`${styles.tabContent} ${activeClass}`} aria-labelledby={labelledBy}>
    //   {children}
    // </div>
  );
}

function Tabs({ children }) {
  const [currentTab, setCurrentTab] = useState(0);

  function handleTabClick(e, i) {
    e.preventDefault();
    setCurrentTab(i);
  }

  const filteredChildren = React.Children.toArray(children).filter((c) => c.type && c.type.name === "Tab");
  const tabItems = filteredChildren.map((c, i) => {
    const isActive = currentTab === i;
    const activeClass = isActive ? styles.tabActive : "";
    const title = c.props.title;
    return (
      <li key={`tabs-${i}`} className={`${styles.tab} ${activeClass}`}>
        <button type="button" onClick={(e) => handleTabClick(e, i)} role="tab">
          {title}
        </button>
      </li>
    );
  });
  const tabContent = filteredChildren.map((c, i) => {
    const props = {
      isActive: currentTab === i,
      key: `tabcontent-${i}`,
    };
    return(<div>This is a test element (where the cloned tab should be)</div>)
    // return cloneElement(c, props);
  });
  return (
    <div className={styles.container}>
      <div>{tabContent}</div>
    </div>
  );
}

export { Tab, Tabs };
