const NUM_OF_DIGITS = 7;

// operator functions
const addOperator = (a, b) => a + b;
const subtractOperator = (a, b) => a - b;
const multiplyOperator = (a, b) => a * b;
const divideOperator = (a, b) => +parseFloat((a / b).toFixed(NUM_OF_DIGITS));
const operatorsMap = {
    "add": addOperator,
    "subtract": subtractOperator,
    "multiply": multiplyOperator,
    "divide": divideOperator
}

// global operation variables
let leftOperand = null;
let operator = null;
let rightOperand = null;
let displayValue = "";
const DEFAULT_DISPLAY = "0"


const displayDiv = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".num");
const decimalPointButton = document.querySelector("#decimal-point");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const operatorsButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");

// function for performing an operation
function operate(leftOperand, operator, rightOperand) {
    return operator(leftOperand, rightOperand);
}

function isNumber(value) {
    return !isNaN(value) && !isNaN(parseFloat(value));
}

function modifyDisplay(type, content) {
    switch (type) {
        case "add":
            displayValue += content;
            break;
        case "deleteChar":
            displayValue = displayValue.slice(0, -1);
            break;
        case "set":
            displayValue = content;
            break;
        case "clear":
            displayValue = "";
            break;
    }

    if (displayValue === ""){
        displayDiv.textContent = DEFAULT_DISPLAY;
    } else {
        displayDiv.textContent = displayValue;
    }
}
numberButtons.forEach((numberButton) => {
    numberButton.addEventListener("click", () => {
        if (operator === null) leftOperand = null;
    })
})
// Modify display
for (let numberButton of numberButtons) {
    let currentNumber = numberButton.textContent;
    numberButton.addEventListener("click", () => modifyDisplay("add", currentNumber));
}

decimalPointButton.addEventListener("click", () => {
    if (!displayValue.includes(".")) {
        modifyDisplay("add", ".");
    }
});

clearButton.addEventListener("click", () => {
    leftOperand = null;
    operator = null;
    rightOperand = null;
    modifyDisplay("clear");
});

deleteButton.addEventListener("click", () => modifyDisplay("deleteChar"));


function onOperatorClick(operatorFunction) {
    if (leftOperand === null) {
        if (isNumber(displayValue)) {
            leftOperand = +displayValue;
            operator = operatorFunction;
            modifyDisplay("clear");
            displayDiv.textContent = leftOperand;
        }
    } else {
        if (isNumber(displayValue) && operator !== null) {
            let result = operate(leftOperand, operator, +displayValue);
            modifyDisplay("clear");
            displayDiv.textContent = result;
            leftOperand = result;
        }
    }
    operator = operatorFunction;
}

function onEqualClick() {
    if (leftOperand !== null && operator !== null && displayValue !== "") {
        let result = operate(leftOperand, operator, +displayValue);
        modifyDisplay("clear");
        displayDiv.textContent = result;
        leftOperand = result;
        operator = null;
    }
}

operatorsButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => {
        let operatorFunction = operatorsMap[operatorButton.id];
        onOperatorClick(operatorFunction);
    })
})

equalsButton.addEventListener("click", onEqualClick);
