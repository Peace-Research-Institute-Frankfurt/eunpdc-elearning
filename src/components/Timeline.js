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
      <date className={Styles.eventDate}>{props.date}</date>
      <span className={Styles.eventDescription}>{props.title}</span>
    </li>
  );
}

export { Timeline, Event };
