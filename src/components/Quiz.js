import React from "react";

function Quiz(props) {
  const questions = React.Children.map(props.children, (child) => {
    return React.cloneElement(child, {
      test: "I'm an injected prop",
      props2: 2,
    });
  });
  return (
    <div className="quiz">
      <h2>This is a quiz component</h2>
      {questions}
    </div>
  );
}
function MultipleChoice(props) {
  return <div>I'm a multiple choice question{JSON.stringify(props.test)}</div>;
}

export { Quiz, MultipleChoice };
