// Get the calculator display element
const display = document.getElementById("display");

// Stores the current expression entered by the user
let expression = "";


/*
 * Adds a number or decimal point to the display.
 */
function appendNumber(number) {
    // Prevent multiple decimal points in the same number
    if (number === ".") {
        const lastNumber = expression.split(/[+\-*/%]/).pop();

        if (lastNumber.includes(".")) {
            return;
        }
    }

    // Replace the initial zero with the entered number
    if (expression === "0" && number !== ".") {
        expression = number;
    } else {
        expression += number;
    }

    display.value = expression;
}


/*
 * Adds an arithmetic operator to the expression.
 */
function appendOperator(operator) {
    // Do nothing if there is no number
    if (expression === "") {
        return;
    }

    // Prevent two operators from being entered consecutively
    if (/[+\-*/%]$/.test(expression)) {
        expression = expression.slice(0, -1);
    }

    expression += operator;
    display.value = expression;
}


/*
 * Clears the entire calculator display and expression.
 */
function clearDisplay() {
    expression = "";
    display.value = "0";
}


/*
 * Removes the last character from the expression.
 */
function deleteLast() {
    expression = expression.slice(0, -1);

    // Show 0 when there is nothing left
    display.value = expression || "0";
}


/*
 * Calculates the final result of the entered expression.
 */
function calculate() {
    if (expression === "") {
        return;
    }

    try {
        // Check for division by zero
        if (/\/0(?!\d)/.test(expression)) {
            display.value = "Cannot divide by 0";
            display.style.fontSize = "26px"; // Smaller error text
            expression = "";
            return;
        }

        const result = Function(`"use strict"; return (${expression})`)();

        if (!Number.isFinite(result)) {
            display.value = "Invalid";
            display.style.fontSize = "20px";
            expression = "";
            return;
        }

        expression = String(result);
        display.value = expression;

        // Restore normal font size
        display.style.fontSize = "32px";

    } catch (error) {
        display.value = "Invalid";
        display.style.fontSize = "20px";
        expression = "";
    }
}