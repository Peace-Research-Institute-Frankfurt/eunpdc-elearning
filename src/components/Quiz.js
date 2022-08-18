import React from "react";
import * as styles from "./Quiz.module.scss";

function Quiz(props) {
  const questions = React.Children.map(props.children, (child) => {
    return child;
  });
  return (
    <div className={styles.container}>
      <div className={styles.questions}>{questions}</div>
      <div className="controls">
        <button>Submit answers</button>
      </div>
    </div>
  );
}

const Question = function ({ question, hint, children }) {
  return (
    <div className={styles.question}>
      <p className={styles.questionText}>
        {question}
        {hint && <span className={styles.questionHint}>{hint}</span>}
      </p>
      {children}
    </div>
  );
};

const Radio = function (props) {
  const choices = React.Children.map(props.children, (child) => {
    return React.cloneElement(child, {
      name: "test",
    });
  });
  return (
    <Question question={props.question} hint={props.hint}>
      <div className={styles.choices}>{choices}</div>
    </Question>
  );
};

const RadioChoice = function (props) {
  return (
    <label className={styles.radioChoice} htmlFor={props.id}>
      <input type="radio" name={props.name} id={props.id} />
      {props.children}
    </label>
  );
};

const MultipleChoice = function (props) {
  const choices = React.Children.map(props.children, (child) => {
    return React.cloneElement(child, {
      name: "test",
    });
  });
  return (
    <Question question={props.question} hint={props.hint}>
      <div className={styles.choices}>{choices}</div>
    </Question>
  );
};

const Choice = function (props) {
  return (
    <label className={styles.radioChoice} htmlFor={props.id}>
      <input type="checkbox" name={props.name} id={props.id} />
      {props.children}
    </label>
  );
};

export { Quiz, Radio, RadioChoice, MultipleChoice, Choice };
