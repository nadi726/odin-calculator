const NUM_OF_DIGITS = 7;
const DEFAULT_DISPLAY = "0";

// operator functions
const addOperator = (a, b) => a + b;
const subtractOperator = (a, b) => a - b;
const multiplyOperator = (a, b) => a * b;
const divideOperator = (a, b) => a / b;
const operatorsMap = {
    "add": addOperator,
    "subtract": subtractOperator,
    "multiply": multiplyOperator,
    "divide": divideOperator
}

// enums
const InputStates = Object.freeze({
    LEFT_OPERAND: 0,
    RIGHT_OPERAND: 1,
    RESET: 2
})

const NumberModificationType = {
    ADD_DIGIT: 0,
    REMOVE_DIGIT: 1
};

// global operation variables
let leftOperand = "";
let rightOperand = "";
let operator = null;
let numberInputState = InputStates.LEFT_OPERAND;
let displayValue = "";


// query selectors for all buttons and display
const displayDiv = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".num");
const decimalPointButton = document.querySelector("#decimal-point");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const operatorsButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");


// Helper functions
function operate(leftOperand, operator, rightOperand) {
    if (leftOperand === "" || leftOperand === ".") leftOperand = "0";
    if (rightOperand === "" || rightOperand === ".") rightOperand = "0";
    let floatResult = operator(leftOperand, rightOperand);
    return parseFloat(floatResult.toFixed(NUM_OF_DIGITS));
}

function validateResult(result) {
    if (result === Infinity || isNaN(result)) {
        onClear();
        setDisplay("WRONG!!");
        return false;
    }
    return true;
}

function setDisplay(content) {
    if (content === "") content = DEFAULT_DISPLAY;
    displayValue = content;
    displayDiv.textContent = displayValue;
}

function modifyNumber(operand, newDigit, modificationType) {
    switch (modificationType) {
        case NumberModificationType.ADD_DIGIT:
            return operand + newDigit;
        case NumberModificationType.REMOVE_DIGIT:
            return operand.slice(0, -1);
    }
}


// Event handlers
function onNumberInput(newDigit, modificationType = NumberModificationType.ADD_DIGIT) {
    switch (numberInputState) {
        case InputStates.LEFT_OPERAND:
            leftOperand = modifyNumber(leftOperand, newDigit, modificationType);
            setDisplay(leftOperand);
            break;
        case InputStates.RIGHT_OPERAND:
            rightOperand = modifyNumber(rightOperand, newDigit, modificationType);
            setDisplay(rightOperand);
            break;
        case InputStates.RESET:
            leftOperand = newDigit;
            setDisplay(newDigit);
            numberInputState = InputStates.LEFT_OPERAND;
            break;
    }
}

function onDecimalPointInput() {
    let currentNumber;
    switch (numberInputState) {
        case InputStates.LEFT_OPERAND:
            currentNumber = leftOperand;
            break;
        case InputStates.RIGHT_OPERAND:
            currentNumber = rightOperand;
            break;
        case InputStates.RESET:
            currentNumber = "0";
            break;
    }
    // insert digit to empty number
    if (currentNumber === "") {
        onNumberInput("0.")
    }
    // attempt to insert digit to existing number
    else if (!currentNumber.includes(".")) {
        onNumberInput(".");
    }
}

function onOperatorClick(operatorFunction) {
    if (leftOperand === "") return;

    if (rightOperand === "") {
        operator = operatorFunction;
        numberInputState = InputStates.RIGHT_OPERAND;
    } else if (operator !== null) {
        let result = operate(+leftOperand, operator, +rightOperand);
        
        if (!validateResult(result)) return;

        setDisplay(result);
        leftOperand = result;
        operator = operatorFunction;
        rightOperand = "";
        numberInputState = InputStates.RIGHT_OPERAND;
    }
}

function onEqualClick() {
    let result;
    if (operator !== null) {
        result = operate(+leftOperand, operator, +rightOperand);
    } else if (leftOperand !== "") {
        result = operate(+leftOperand, (left, right) => +left, null);
    } else {
        result = "0";
    }

    if (!validateResult(result)) return;

    setDisplay(result);
    leftOperand = result;
    operator = null;
    rightOperand = "";
    numberInputState = InputStates.RESET;
}

function onClear() {
    leftOperand = "";
    operator = null;
    rightOperand = "";
    numberInputState = InputStates.LEFT_OPERAND;
    setDisplay("");
}

const onDelete = () => onNumberInput("", NumberModificationType.REMOVE_DIGIT);


for (let numberButton of numberButtons) {
    let currentNumber = numberButton.textContent;
    numberButton.addEventListener("click", () => onNumberInput(currentNumber));
}

decimalPointButton.addEventListener("click", onDecimalPointInput);

clearButton.addEventListener("click", onClear);

deleteButton.addEventListener("click", onDelete);

operatorsButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => {
        let operatorFunction = operatorsMap[operatorButton.id];
        onOperatorClick(operatorFunction);
    })
})

equalsButton.addEventListener("click", onEqualClick);
