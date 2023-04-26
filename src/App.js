import React, { useState } from "react";
import Button from "./components/Button";
import Screen from "./components/Screen";
import keys from "./keys";
// import associativity from "./associativity";
import "./assets/style/app.css";

export default function App() {
  //declaring states
  const [value, setValue] = useState(0); //for display
  // const [operand, setOperand] = useState([]); //operand stack
  // const [operator, setOperator] = useState([]); //operator stack
  const [firstInputNumber, setFirstInputNumber] = useState(0); //each input
  const [secondInputNumber, setSecondInputNumber] = useState(0); //each input

  const [operator, setOperator] = useState("");

  // function checkAssociativity(operatorStack, newOperator) {
  //   const newOperatorAssociativity = associativity.find(
  //     (sign) => sign.value == newOperator
  //   );
  //   const operatorStackAssociativity =
  //     operatorStack.length &&
  //     associativity.find(
  //       (sign) => sign.value == operatorStack[operatorStack.length - 1]
  //     );

  //   if (
  //     operatorStack.length == 0 ||
  //     newOperatorAssociativity.precedence > operatorStack.precedence
  //   ) {
  //     operatorStack.push(newOperator);
  //     setOperator(operatorStack);
  //   } else {
  //     calculateResult();
  //   }
  // }

  // const handleClick = (e) => {
  //   const input = e.target.value; //get the button input
  //   const { type: inputType } = keys.find((key) => key.value == input); //get type of input
  //   if (inputType === "number") {
  //     if (!value) {
  //       //if initially 0
  //       setValue(e.target.value);
  //       setInputNumber(e.target.value);
  //     } else {
  //       setValue(value + e.target.value);
  //       setInputNumber(inputNumber + e.target.value);
  //     }
  //   } else {
  //     switch (input) {
  //       case "=":
  //         break;
  //       case "AC":
  //         break;
  //       case "%":
  //         break;
  //       default: {
  //         checkAssociativity(operator, input);
  //       }
  //     }
  //     // if (input === "=" ) {
  //     // }
  //     //  else {

  //     //   // const operatorTemp = operator;
  //     //   // const operandTemp = operand;
  //     //   // operatorTemp.push(+inputNumber);
  //     //   // setOperator(operatorTemp);
  //     //   // setInputNumber(0);
  //     //   // operandTemp.push(input);
  //     //   // setOperand(operandTemp);
  //     //   // setValue(value + e.target.value);
  //     //   // console.log("Operand: " + operand);
  //     //   // console.log("Operator: " + operator);
  //     // }
  //   }
  // };

  // console.log("1 num: " + firstInputNumber);
  // console.log("operator: " + operator);
  // console.log(" 2 num: " + secondInputNumber);
  const handleClick = (e) => {
    const input = e.target.value;
    const { type: inputType } = keys.find((key) => key.value == input);
    console.log(inputType);

    if (inputType === "number") {
      !value ? setValue(input) : setValue(value + input);

      operator !== "" && setSecondInputNumber(secondInputNumber + input);
    } else {
      switch (input) {
        case "+/-":
          if (operator !== "") return;
          let valueTemp = value.toString();
          valueTemp.slice(0, 1) != "-"
            ? setValue("-" + value)
            : setValue(valueTemp.slice(1));
          return;
        case "AC":
          setValue(0);
          setFirstInputNumber(0);
          setOperator("");
          setSecondInputNumber(0);
          return;

        case "%":
          if (operator === "") {
            setValue(calculateResult(value, 100, "÷"));
          }
          return;

        case "=":
          if (operator !== "") {
            setValue(
              calculateResult(firstInputNumber, secondInputNumber, operator)
            );
            setFirstInputNumber(value);
            setSecondInputNumber(0);
            setOperator("");
          }
          return;

        default:
          if (operator !== "") {
            setOperator(input);
            let valueTemp = value.toString();
            setValue(valueTemp.slice(0, value.length - 1) + input);
          } else {
            setOperator(input);
            setFirstInputNumber(value);
            setValue(value + input);
          }
          break;
      }
    }
  };

  return (
    <div className="app">
      <Screen value={value} />
      {keys.map((key) => (
        <Button
          key={key.value}
          handleClick={handleClick}
          className={
            (!key.value && "btn-zero") ||
            (key.type === "arithmetic operator" && "btn-arithmeticOperator") ||
            ""
          }
          label={key.value}
        />
      ))}
    </div>
  );
}

function calculateResult(firstValue, secondValue, operator) {
  switch (operator) {
    case "+":
      console.log(+firstValue + +secondValue);
      return +firstValue + +secondValue;

    case "-":
      console.log(+firstValue - +secondValue);
      return +firstValue - +secondValue;

    case "x":
      console.log(+firstValue * +secondValue);
      return +firstValue * +secondValue;

    case "÷":
      console.log(+firstValue / +secondValue);
      return +firstValue / +secondValue;
  }
}
