import React from "react";
import * as styles from "./Quiz.module.scss";

function Quiz(props) {
  const questions = React.Children.map(props.children, (child) => {
    return child;
  });
  return (
    <div className={styles.container}>
      <h2>This is a quiz component</h2>
      <div className="questions">{questions}</div>
      <div className="controls">
        <button>Submit answers</button>
      </div>
    </div>
  );
}

const RadioChoice = function (props) {
  return (
    <label htmlFor={props.id}>
      <input type="radio" name={props.name} id={props.id} />
      {props.children}
    </label>
  );
};

const Radio = function (props) {
  const choices = React.Children.map(props.children, (child) => {
    return React.cloneElement(child, {
      name: "test",
    });
  });
  return (
    <div>
      {props.question}
      {choices}
    </div>
  );
};

Radio.Choice = RadioChoice;

export { Quiz, Radio, RadioChoice };
