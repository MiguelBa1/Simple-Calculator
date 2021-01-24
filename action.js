const display = document.getElementById("display");
const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");
let resultDisplayed = false
for (let num of numbers) {
    num.addEventListener("click", () => {
        if (resultDisplayed) {
            display.innerText = "0"
            resultDisplayed = false
        }
        if (display.innerText == "0") {
            display.innerText = num.value;
        } else {
            display.innerText += num.value;
        }
    })
}
for (let opr of operators) {
    opr.addEventListener("click", () => {
        let currentString = display.innerText;
        let lastChar = display.innerText[display.innerHTML.length - 1];
        if (resultDisplayed) {
            display.innerText = "0"
            resultDisplayed = false
        }
        else if (lastChar.match(/[\+\-\/x]/)) {
            display.innerText = currentString.substring(0, currentString.length - 1) + opr.innerHTML
        } else {
            display.innerText += opr.innerHTML;
        }
    })
}
document.getElementById("equals").addEventListener("click", () => {
    let inputString = display.innerText
    //firts we must split the string in the input by the operators
    let numbers = inputString.split(/[\+\-\/x]/)
    //then we need too the operators
    let oprs = inputString.match(/[\+\-\/x]/g, "")
    // in the mathematical hierarchy, we must loop through the array
    let divide = oprs.indexOf("/")
    while (divide != -1){
        numbers.splice(divide, 2, parseFloat(numbers[divide]) / parseFloat(numbers[divide + 1]))
        oprs.splice(divide, 1)
        divide = oprs.indexOf("/")
    }
    let multiply = oprs.indexOf("x")
    while (multiply != -1){
        numbers.splice(multiply, 2, parseFloat(numbers[multiply]) * parseFloat(numbers[multiply + 1]))
        oprs.splice(multiply, 1)
        multiply = oprs.indexOf("x")
    }
    let minus = oprs.indexOf("-")
    while (minus != -1){
        numbers.splice(minus, 2, parseFloat(numbers[minus] )- parseFloat(numbers[minus + 1]))
        oprs.splice(minus, 1)
        minus = oprs.indexOf("-")
    }
    let plus = oprs.indexOf("+")
    while (plus != -1){
        numbers.splice(plus, 2, parseFloat(numbers[plus]) + parseFloat(numbers[plus + 1]))
        oprs.splice(plus, 1)
        plus = oprs.indexOf("+")
    }
    display.innerText = numbers[0].toString()
    resultDisplayed = true
})
document.getElementById("decimal").addEventListener("click", () => {
    let currentString = display.innerText;
    if (currentString.match(/\./g) <= 1) {
        display.innerText = currentString + ".";
    } else if (currentString.match(/[\+\-\/\*]/g)) {
        display.innerText = currentString + ".";
    } 
    console.log(currentString.match(/[\+\-\/\*]/g), currentString)
})
document.getElementById('clear').addEventListener('click', () => {
    display.innerText = '0'
})
