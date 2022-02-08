import React from "react";
import classNames from "classnames";

export const Equation = ({
  left,
  operator,
  right,
  currentAnswer,
  onAnswerChange,
  answerStatus,
  onWrongAnimationEnd,
  onCorrectAnimationEnd,
}) => {
  const ref = React.useRef();

  // Re-focus the answer input anytime we change into the waiting state.
  React.useEffect(() => {
    if (answerStatus === "waiting" && ref.current) {
      ref.current.focus();
    }
  }, [answerStatus]);

  return (
    <div className="equation__container">
      <div className="equation__left-hand-side">
        {left} {operator} {right} =
      </div>
      <input
        name="answer"
        value={currentAnswer}
        onChange={(event) => onAnswerChange(event.currentTarget.value)}
        className={classNames(
          "equation__answer",
          `equation__answer--${answerStatus}`
        )}
        aria-label={`what is the answer for ${left} ${operator} ${right}?`}
        placeholder="?"
        maxLength={3}
        ref={ref}
        autoComplete="off"
        onAnimationEnd={() => {
          switch (answerStatus) {
            case "wrong":
              onWrongAnimationEnd();
              break;
            case "correct":
              onCorrectAnimationEnd();
              break;
            default:
              break;
          }
        }}
      />
    </div>
  );
};
