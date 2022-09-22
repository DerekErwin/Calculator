// Display needs to be at most 9 digits long
let previousValue = 0;
let currentValue = "0";
let lastOperation = "addition";
let newDigits = false;
let firstEntry = true;
let display = document.getElementById('display');
let digitBtn = document.querySelectorAll('.digit');

let clearBtn = document.getElementById('clear');
let posNegBtn = document.getElementById('posNeg');
let percentBtn = document.getElementById('percent');
let divideBtn = document.getElementById('/');
let multiplyBtn = document.getElementById('*');
let subtractBtn = document.getElementById('-');
let additionBtn = document.getElementById('+');
let decimalBtn = document.getElementById('.');
let equalsBtn = document.getElementById('=');

function subtract(num1, num2) { return Big(num1).minus(num2); }
function add(num1, num2) { return Big(num1).plus(num2); }
function multiply(num1, num2) { return Big(num1).times(num2); }
function divide(num1, num2) { return Big(num1).div(num2); }

function countDecimals(num) {
    let numStr = num.toString();
    if (numStr.includes('.')) {
        return numStr.split('.')[1].length;
    }
    return 0;
}

function operate(operation) {
    lastOperation = operation;
    if (newDigits) {
        if (firstEntry == false) {
            currentValue = Number(currentValue);
            switch (operation) {
                case "divide":
                    if (currentValue == 0) {
                        display.textContent = ":(";
                    } else if (previousValue == 0) {
                        previousValue = divide(currentValue, 1);
                    } else {
                        previousValue = divide(previousValue, currentValue);
                    }
                    break;
                case "multiply":
                    if (previousValue == 0) {
                        previousValue = multiply(1, currentValue);
                    } else if (currentValue == 0) {
                        previousValue = multiply(previousValue, 1);
                    } else {
                        previousValue = multiply(previousValue, currentValue);
                    }
                    break;
                case "addition":
                    previousValue = add(previousValue, currentValue);
                    break;
                case "subtract":
                    previousValue = subtract(previousValue, currentValue);
                    break;
                case "":
                    break;
            }
            currentValue = "0";
            
            if(previousValue.toString().length >= 10){
                previousValue = previousValue.toPrecision(9);
            }

            if (display.textContent == ":(") {
            } else if (previousValue > 999999999) {
                display.textContent = "Can't display";
            } else {
                display.textContent = previousValue;
            }

            newDigits = false;
        } else {
            firstEntry = false;
            previousValue = currentValue;
            currentValue = "0";
        }
    }
}

digitBtn.forEach((digit) => {
    digit.addEventListener('click', () => {
        if (currentValue == 0 && !currentValue.includes(".")) {
            currentValue = '';
        }
        if (currentValue.toString().length < 9) {
            currentValue = currentValue + "" + digit.textContent;
            display.textContent = currentValue;
        }
        newDigits = true;
    });
})

clearBtn.addEventListener('click', () => {
    previousValue = 0;
    currentValue = "0";
    lastOperation = "";
    firstEntry = true;
    display.textContent = currentValue;
});
posNegBtn.addEventListener('click', () => { 
    currentValue = Number(display.textContent);
    currentValue = Big(currentValue).neg().toString();
    display.textContent = currentValue;
});
percentBtn.addEventListener('click', () => { 
    currentValue = (Number(currentValue) / 100).toString();
    display.textContent = currentValue;
});

divideBtn.addEventListener('click', () => { operate("divide"); });
multiplyBtn.addEventListener('click', () => { operate("multiply") });
subtractBtn.addEventListener('click', () => { operate("subtract") });
additionBtn.addEventListener('click', () => { operate("addition") });

decimalBtn.addEventListener('click', () => {
    if (!display.textContent.toString().includes(".")) {
        currentValue = currentValue + ".";
        display.textContent = currentValue;
    }
});
equalsBtn.addEventListener('click', () => {
    operate(lastOperation);
    lastOperation = "";
});

