const previousOperationText = document.querySelector(".previousDisplay");
const currentOperationText = document.querySelector(".currentDisplay");
const buttons = document.querySelectorAll(".buttons button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }
    addDigit(digit) {
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        this.currentOperation = digit;
        this.updateScreen();
    }
    processOperation(operation) {
        if(this.currentOperationText.innerText === "" && operation !== "CE") {
            if(this.previousOperationText.innerText !== ""){
                this.changeOperation(operation);
            }
            return
        }

        let operationValue;
        let previus = +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
                operationValue = previus + current;
                this.updateScreen(operationValue, previus, current, operation);
                break;
            case "-":
                operationValue = previus - current;
                this.updateScreen(operationValue, previus, current, operation);
                break;
            case "*":
                operationValue = previus * current;
                this.updateScreen(operationValue, previus, current, operation);
                break;
            case "/":
                operationValue = previus / current;
                this.updateScreen(operationValue, previus, current, operation);
                break;
            case "DEL":
                this.processDel();
                break;
            case "C":
                this.processClearCurret();
                break;
            case "CE":
                this.processClearAll();
                break;
            case "=":
                this.processEqual();
                break;
            default:
                break;
        }
    }

    updateScreen(
        operationValue = null,
        previus = null,
        current = null,
        operation = null,
    ) {
        if(operationValue === null) {
            this,currentOperationText.innerText += this.currentOperation;
        }else {
            if(previus === 0) {
                operationValue = current;
            }

            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }
    changeOperation(operation) {
        const mathOperation = ["+", "-", "*", "/"];
        if(!mathOperation.includes(operation)) {
            return;
        }
        this.previousOperationText.innerText = 
            this.previousOperationText.innerText.slice(0, -1) + operation;
    }
    processDel() {
        this.currentOperationText.innerText = 
            this.currentOperationText.innerText.slice(0, -1);
    }
    processClearCurret() {
        this.currentOperationText.innerText = "";
    }

    processClearAll() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }
    processEqual() {
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value ===".") {
            calc.addDigit(value);
        }else {
            calc.processOperation(value);
        }
    })
})