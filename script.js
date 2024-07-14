// operator functions
const addOperator = (a, b) => a + b;
const subtractOperator = (a, b) => a - b;
const multiplyOperator = (a, b) => a * b;
const divideOperator = (a, b) => a / b;

// global operation variables
let leftOperand;
let operator;
let rightOperand;
let displayValue = "";
const DEFAULT_DISPLAY = "0"

//
const displayDiv = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".num");
const decimalPointButton = document.querySelector("#decimal-point");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");

// function for performing an operation
function operate(leftOperand, operator, rightOperand) {
    return operator(leftOperand, rightOperand);
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