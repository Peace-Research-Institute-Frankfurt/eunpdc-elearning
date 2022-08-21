import React, { useEffect, useId, useState } from "react";
import Button from "./Button";
import * as styles from "./Quiz.module.scss";

function Quiz(props) {
  const questions = React.Children.map(props.children, (child) => {
    return child;
  });
  return (
    <div className={styles.container}>
      <div>{questions}</div>
      <div className="controls">
        <Button label="Submit answers" />
      </div>
    </div>
  );
}

const Question = function ({ question, hint, children, status }) {
  return (
    <div className={styles.question}>
      <p className={styles.questionText}>
        {question} ({status}){hint && <span className={styles.questionHint}>{hint}</span>}
      </p>
      {children}
    </div>
  );
};

const Radio = function (props) {
  const [value, setValue] = useState();
  let choices = [];
  let answer = null;
  const baseId = useId();
  let status = "wrong";

  function handleInput(e) {
    setValue(e.target.id);
  }

  choices = React.Children.map(props.children, (child, i) => {
    const name = `radio-${baseId}`;
    const choiceId = `${baseId}${i}`;
    if (child.props.correct) {
      answer = choiceId;
    }
    return React.cloneElement(child, {
      name: name,
      checked: value === choiceId,
      id: choiceId,
      groupValue: value,
      handleInput: handleInput,
    });
  });

  if (value === answer) {
    status = "true";
  } else {
    status = "wrong";
  }

  return (
    <Question question={props.question} hint={props.hint} status={status}>
      <div className={styles.choices}>{choices}</div>
    </Question>
  );
};

const RadioChoice = function (props) {
  function handleInput(e) {
    props.handleInput(e);
  }
  return (
    <label className={styles.radioChoice} htmlFor={props.id}>
      <input type="radio" name={props.name} id={props.id} value={props.value} onInput={handleInput} />
      {props.value}
      Checked: {JSON.stringify(props.checked)}
    </label>
  );
};

const MultipleChoice = function (props) {
  const [status, setStatus] = useState("wrong");
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
