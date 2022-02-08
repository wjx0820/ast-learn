import React from "react";
import { Equation } from "../Equation/Equation";
import { Select } from "../Select/Select";
import { generateEquation } from "../../helpers";

const NUMBER_OF_EQUATIONS_OPTIONS = [3, 5, 10, 25, 50, 100, "∞"];

export const Dashboard = () => {
  const [equation, setEquation] = React.useState(null);
  const [currentAnswer, setCurrentAnswer] = React.useState("");
  const [answerStatus, setAnswerStatus] = React.useState("waiting");
  const [totalCorrect, setTotalCorrect] = React.useState(0);
  const [requiredCorrect, setRequiredCorrect] = React.useState(10);

  const handleStart = () => {
    setEquation(generateEquation());
  };

  const handleAnswerChange = (answer) => setCurrentAnswer(answer);

  const handleSkip = () => {
    setCurrentAnswer("");
    setAnswerStatus("waiting");
    setEquation(generateEquation());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (parseInt(currentAnswer, 10) === equation.answer) {
      setAnswerStatus("correct");
      setTotalCorrect((totalCorrect) => totalCorrect + 1);
    } else {
      setAnswerStatus("wrong");
    }
  };

  const handleWrongAnimationEnd = () => {
    setCurrentAnswer("");
    setAnswerStatus("waiting");
  };
  const handleCorrectAnimationEnd = () => {
    setCurrentAnswer("");
    setAnswerStatus("waiting");

    if (totalCorrect >= requiredCorrect) {
      setAnswerStatus("completed");
    } else {
      setEquation(generateEquation());
    }
  };

  const handleStartOver = () => {
    setAnswerStatus("waiting");
    setTotalCorrect(0);
    setEquation(null);
  };

  if (answerStatus === "completed") {
    return (
      <div className="dashboard__complete-container">
        <h2 className="dashboard__complete-heading">Nice job!</h2>
        <span role="img" className="dashboard__complete-img">
          🎉
        </span>
        <p className="dashboard__complete-description">
          You got {totalCorrect} correct!
        </p>
        <button
          type="button"
          className="button button--primary"
          onClick={handleStartOver}
        >
          <span role="img">♻</span> Start over
        </button>
      </div>
    );
  } else if (equation) {
    return (
      <form onSubmit={handleSubmit}>
        <Equation
          {...equation}
          currentAnswer={currentAnswer}
          onAnswerChange={handleAnswerChange}
          answerStatus={answerStatus}
          onWrongAnimationEnd={handleWrongAnimationEnd}
          onCorrectAnimationEnd={handleCorrectAnimationEnd}
        />
        <div className="dashboard__button-group">
          <button
            type="button"
            className="button button--danger"
            onClick={handleSkip}
          >
            <span role="img">🚫</span> Skip
          </button>
          <div>
            <button type="submit" className="button button--primary">
              <span role="img">👉</span> Submit answer
            </button>
            <p className="dashboard__total-correct">
              Total Correct: {totalCorrect}
            </p>
          </div>
        </div>
      </form>
    );
  } else {
    return (
      <>
        <p className="dashboard__get-started">
          Go until you answer{" "}
          <Select
            value={Number.isFinite(requiredCorrect) ? requiredCorrect : "∞"}
            onChange={(event) => {
              const { value } = event.currentTarget;

              if (value === "∞") {
                setRequiredCorrect(Number.POSITIVE_INFINITY);
              } else {
                setRequiredCorrect(parseInt(value, 10));
              }
            }}
            ariaLabel="required number of correct answers"
          >
            {NUMBER_OF_EQUATIONS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>{" "}
          correctly.
        </p>
        <div className="dashboard__get-started-action">
          <button className="button button--primary" onClick={handleStart}>
            <span role="img">🚦</span> Go!
          </button>
        </div>
      </>
    );
  }
};
