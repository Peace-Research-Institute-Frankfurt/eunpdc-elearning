import React, { useState, useId, useEffect } from "react";
import * as styles from "./Quiz.module.scss";


const Choice = function (props) {
  function handleChange(e) {
    props.handleChange(props.questionId, props.choiceId);
  }

  return (
    <label className={styles.radioChoice} htmlFor={props.id}>
      <input data-index={props.index} checked={props.checked} type="checkbox" name={props.name} id={props.id} onChange={handleChange} />
      {props.value}
    </label>
  );
};

export { Choice };
