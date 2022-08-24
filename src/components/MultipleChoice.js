import React from "react";
import * as styles from "./Quiz.module.scss";

const Choice = function (props) {
  function handleChange(e) {
    props.handleChange(props.questionId, props.choiceId);
  }

  const correctlyChecked = props.checked === props.correct;

  return (
    <label className={styles.radioChoice} htmlFor={props.id}>
      <input data-index={props.index} checked={props.checked} type="checkbox" name={props.name} id={props.id} onChange={handleChange} />
      {props.value}
      {correctlyChecked && "Ayyeee"}
    </label>
  );
};

export { Choice };
