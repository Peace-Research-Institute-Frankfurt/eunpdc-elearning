import React, { useState, useEffect } from "react";
import Button from "./Button";
import { Choice } from "./MultipleChoice";
import * as styles from "./Quiz.module.scss";

function Quiz(props) {
  const [resultsVisible, setResultsVisible] = useState(false);
  const [questions, setQuestions] = useState([]);

  function handleRadioChange(questionId, choiceId) {
    const newQuestions = questions.map((q) => {
      if (q.id === questionId) {
        return {
          ...q,
          value: choiceId,
        };
      } else {
        return q;
      }
    });
    setQuestions(newQuestions);
  }

  function handleMultipleChoiceChange(questionId, choiceId) {
    console.log(questionId);
    const newQuestions = questions.map((q) => {
      if (q.id === questionId) {
        let newValue = [];
        const index = q.value.indexOf(choiceId);
        if (index !== -1) {
          newValue = q.value.filter((el) => el !== choiceId);
        } else {
          newValue = [...q.value, choiceId];
        }

        return {
          ...q,
          value: newValue,
        };
      } else {
        return q;
      }
    });
    setQuestions(newQuestions);
  }
  function handleSubmit() {
    setResultsVisible(!resultsVisible);
  }

  // On mount, build an abstract representation of the quiz
  useEffect(() => {
    const newQuestions = React.Children.map(props.children, (child, questionIndex) => {
      let choices = null;
      const questionType = child.props.type;
      let initialValue = "";
      let solution = null;

      if (questionType === "Radio" || questionType === "MultipleChoice") {
        choices = React.Children.map(child.props.children, (option, optionIndex) => {
          return {
            value: option.props.value,
            correct: typeof option.props.correct !== "undefined",
            id: `question-${questionIndex}-${optionIndex}`,
          };
        });
      }

      // Surface the solution to each question so we
      // don't have to it again later
      if (questionType === "Radio") {
        initialValue = "";
        let s = choices.find((el) => el.correct);
        solution = s.id;
      }
      if (questionType === "MultipleChoice") {
        initialValue = [];
        let s = choices.filter((el) => el.correct);
        solution = s.map((el) => el.id);
      }
      return {
        id: `question-${questionIndex}`,
        type: questionType,
        questionText: child.props.question,
        questionHint: child.props.hint,
        value: initialValue,
        solution: solution,
        choices: choices,
      };
    });
    setQuestions(newQuestions);
  }, [props.children]);

  const questionElements = questions.map((q) => {
    let inner = null;
    let status = "unset";

    if (q.type === "Radio") {
      let choices = q.choices.map((c) => {
        return (
          <RadioChoice
            key={c.id}
            value={c.value}
            questionId={q.id}
            choiceId={c.id}
            checked={q.value === c.id}
            handleChange={handleRadioChange}
          ></RadioChoice>
        );
      });
      if (q.value === q.solution) {
        status = "full";
      } else {
        status = "none";
      }
      inner = <>{choices}</>;
    } else if (q.type === "MultipleChoice") {
      let score = 0;
      status = "none";
      q.value.forEach((el) => {
        // +1 point if the answer is part of the solution,
        if (q.solution.indexOf(el) !== -1) {
          score += 1;
          status = "partial";
        } else {
          score -= 1;
        }
      });

      if (score === q.solution.length) {
        status = "full";
      }
      const choices = q.choices.map((c, i) => {
        return (
          <Choice
            handleChange={handleMultipleChoiceChange}
            value={c.value}
            checked={q.value.indexOf(c.id) !== -1}
            questionId={q.id}
            choiceId={c.id}
            key={c.id}
          ></Choice>
        );
      });
      inner = <>{choices}</>;
    }
    return (
      <Question key={q.id} question={q.questionText} hint={q.questionHint} status={status} resultsVisible={resultsVisible}>
        {inner}
      </Question>
    );
  });

  return (
    <div className={styles.container}>
      <div>{questionElements}</div>
      <div className="controls">
        <Button label="Show answers" onClick={handleSubmit} />
      </div>
    </div>
  );
}

const Question = function (props) {
  return (
    <div className={styles.question}>
      <p className={styles.questionText}>
        {props.question}
        {props.resultsVisible && <span> ({props.status})</span>}
      </p>
      {props.hint && <p className={styles.questionHint}>{props.hint}</p>}
      {props.children}
    </div>
  );
};

const RadioChoice = function (props) {
  function handleChange(e) {
    props.handleChange(props.questionId, props.choiceId);
  }
  return (
    <label className={props.checked ? styles.radioChoiceChecked : styles.radioChoice} htmlFor={props.id}>
      <input type="radio" name={props.questionId} id={props.id} checked={props.checked} onChange={handleChange} />
      {props.value}
    </label>
  );
};

export { Quiz, RadioChoice, Question };
