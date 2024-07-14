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

function populateDisplay(digit) {
    displayValue += digit;
    displayDiv.textContent = displayValue;
}


// Manipulate display
for (let numberButton of numberButtons) {
    let currentNumber = numberButton.textContent;
    numberButton.addEventListener("click", () => populateDisplay(currentNumber));
}

decimalPointButton.addEventListener("click", () => {
    if (!displayValue.includes(".")) {
        populateDisplay(".");
    }
});

clearButton.addEventListener("click", () => {
    leftOperand = null;
    operator = null;
    rightOperand = null;
    displayValue = "";
    displayDiv.textContent = "0";
});

deleteButton.addEventListener("click", () => {
    displayValue = displayValue.slice(0, -1);
    displayDiv.textContent = displayValue;
});