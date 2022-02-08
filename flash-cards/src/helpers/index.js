export const OPERATORS = ["+", "-", "x", "/"];

export const getRandomOperator = () =>
  OPERATORS[Math.floor(Math.random() * OPERATORS.length)];

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const calculateEquation = (left, operator, right) => {
  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "x":
      return left * right;
    case "/":
      return left / right;
    default:
      throw new Error(`Unhandled operator: ${operator}`);
  }
};

export const generateEquation = () => {
  const operator = getRandomOperator();

  if (operator === "/") {
    const answer = getRandomInt(0, 10);
    const denominator = getRandomInt(1, 10);
    const left = answer * denominator;

    return {
      left,
      operator,
      right: denominator,
      answer,
    };
  } else {
    const left = getRandomInt(0, 10);
    const right = getRandomInt(0, 10);

    return {
      left,
      operator,
      right,
      answer: calculateEquation(left, operator, right),
    };
  }
};
