// operator functions
const addOperator = (a, b) => a + b;
const subtractOperator = (a, b) => a - b;
const multiplyOperator = (a, b) => a * b;
const divideOperator = (a, b) => a / b;

// global operation variables
let leftOperand;
let operator;
let rightOperand;

// function for performing an operation
function operate(leftOperand, operator, rightOperand) {
    return operator(leftOperand, rightOperand);
}