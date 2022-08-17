import React from "react";
import * as Styles from "./Timeline.module.scss";

function Timeline(props) {
  const events = React.Children.map(props.children, (child) => {
    return React.cloneElement(child, {
      test: "I'm an injected prop",
    });
  });
  return (
    <div className={Styles.container}>
      <span className={Styles.line}></span>
      <ol>{events}</ol>
    </div>
  );
}
function Event(props) {
  return (
    <li className={Styles.event}>
      <div className={Styles.eventDescription}>
        <span className={Styles.eventDate}>{props.date}</span>
        <h3 className={Styles.eventTitle}>{props.title}</h3>
        {props.children}
      </div>
    </li>
  );
}

export { Timeline, Event };
