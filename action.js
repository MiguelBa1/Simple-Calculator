const display = document.getElementById("display");
const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");
const ans = document.getElementById('ans')
let resultDisplayed = false
for (let num of numbers) {
    num.addEventListener("click", () => {
        let lastChar = ans.innerText[ans.innerHTML.length - 1];
        if (ans.innerText == "0") {
            ans.innerText = num.value;
            display.innerText = num.value;
        } else if (lastChar.match(/[\+\-\/x]/)) {
            ans.innerText += num.value;
            display.innerText = num.value;
        } else {
            ans.innerText += num.value;
            display.innerText += num.value;
        }
    })
}
for (let opr of operators) {
    opr.addEventListener("click", () => {
        let currentString = ans.innerText;
        let lastChar = ans.innerText[ans.innerHTML.length - 1];
        if (opr.innerHTML == '-') {
            if (lastChar.match(/[\+\/x]/)) {
                ans.innerText += opr.innerText
            } else if (lastChar != '-') {
                ans.innerText += opr.innerText
            }
            display.innerText = opr.innerText
        } else if (lastChar.match(/[\+\/x]/)) {
            ans.innerText = currentString.substring(0, currentString.length - 1) + opr.innerText
            display.innerText = opr.innerText
        } else if (opr.innerText != '-' && lastChar == '-') {
            ans.innerText = currentString.substring(0, currentString.length - 2) + opr.innerText;
            display.innerText = opr.innerText
        } else {
            ans.innerText += opr.innerText
        }
    })
}
document.getElementById("equals").addEventListener("click", () => {
    let inputString = ans.innerText
    //firts we must split the string in the input by the operators
    let numbers = inputString.split(/[\+\-\/x]/)
    console.log(numbers)
    //then we need too the operators
    let oprs = inputString.match(/[\+\-\/x]/g, "")
    //sanitaze the array for '12+-5' like
    let blank = numbers.indexOf('')
    while (blank != -1) {
        numbers[blank+1] = '-' + numbers[blank+1]
        numbers.splice(blank, 1)
        oprs.splice(blank, 1)
        blank = numbers.indexOf('')
    }
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
    ans.innerText = numbers[0].toString()
    resultDisplayed = true
})
document.getElementById("decimal").addEventListener("click", () => {
    let currentString = ans.innerText;
    if (currentString.match(/\./g) <= 1) {
        display.innerText = currentString + ".";
        ans.innerText = currentString + ".";
    } else if (currentString.match(/[\+\-\/\*]/g)) {
        display.innerText = currentString + ".";
        ans.innerText = currentString + ".";
    } 
})
document.getElementById('clear').addEventListener('click', () => {
    display.innerText = '0'
    ans.innerText = '0'
})
