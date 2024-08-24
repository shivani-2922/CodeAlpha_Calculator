// script.js
let display = document.getElementById('display');
let currentOperand = '';
let previousOperand = '';
let operation = null;

function appendNumber(number) {
    if (currentOperand.includes('.') && number === '.') return;
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    highlightOperationButton(op);
    previousOperand = currentOperand;
    currentOperand = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation;
    operation = null;
    previousOperand = '';
    updateDisplay();
    removeHighlightFromButtons();
}

function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();
    removeHighlightFromButtons();
}

function updateDisplay() {
    display.innerText = currentOperand;
}

function highlightOperationButton(op) {
    removeHighlightFromButtons();
    switch (op) {
        case '+':
            document.querySelector(`[onclick="chooseOperation('+')"]`).classList.add('add');
            break;
        case '-':
            document.querySelector(`[onclick="chooseOperation('-')"]`).classList.add('subtract');
            break;
        case '*':
            document.querySelector(`[onclick="chooseOperation('*')"]`).classList.add('multiply');
            break;
        case '/':
            document.querySelector(`[onclick="chooseOperation('/')"]`).classList.add('divide');
            break;
    }
}

function removeHighlightFromButtons() {
    document.querySelectorAll('.btn').forEach(button => {
        button.classList.remove('add', 'subtract', 'multiply', 'divide');
    });
}

clearDisplay();
