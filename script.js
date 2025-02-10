const display = document.querySelector('#display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let runningTotal = 0;
let operator = null;
let operand1 = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.textContent;

        if (buttonValue === 'C') {
            clear();
        } else if (buttonValue === 'DEL') {
            del();
        } else if (buttonValue === '=') {
            if (operator && operand1 !== null) {
                runningTotal = operate(operator, operand1, parseFloat(currentInput));
                currentInput = Number.isInteger(runningTotal) ? runningTotal : runningTotal.toFixed(4);
                display.value = currentInput;
                operator = null;
                operand1 = null;
            }
        } else if (['+', '-', '*', '/'].includes(buttonValue)) {
            if (operator && currentInput === '') return;
            if (currentInput !== '') {
                if (operator && operand1 !== null) {
                    operand1 = operate(operator, operand1, parseFloat(currentInput));
                } else {
                    operand1 = parseFloat(currentInput);
                }
                operator = buttonValue;
                currentInput = '';
            }
        } else {
            if (buttonValue === '.' && currentInput.includes('.')) {
                return;
            }
            currentInput += buttonValue;
        }

        display.value = currentInput;
    });
});

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? "Error" : a / b);

const operate = (operator, a, b) => {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return b;
    }
    display.value = currentInput;
};

const del = () => {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
};

const clear = () => {
    currentInput = '';
    runningTotal = 0;
    operator = null;
    operand1 = null;
};
