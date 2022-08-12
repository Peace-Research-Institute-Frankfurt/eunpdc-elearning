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
      <span className={Styles.eventDate}>{props.date}</span>
      <div className={Styles.eventDescription}>
        <span className={Styles.eventTitle}>{props.title}</span>
        {props.children}
      </div>
    </li>
  );
}

export { Timeline, Event };
