//The "Cannot access before initialization"s
const grid = document.querySelector(".calc-grid"),
io = document.createElement("textarea")

io.style.gridArea = "io"
io.className = "io"
io.disabled = true


//Calculation stuff
const temp = `((?<!(\\)|\\d))(-|\\+)?)\\d+(\\.\\d+)?`,
numRegex = `(${temp}e(-|\\+)?\\d+|${temp}|Infinity)`

class Operator {
    constructor(symbols, gridArea, solve) {
        createSingleButton(symbols[0], gridArea)
        const regex = new RegExp(numRegex + `(${symbols.map(symbol => symbol.split("").map(c => "\\" + c).join("")).join("|")})` + numRegex, "g")

        this.operate = toOperate => {
            let foundMatch = toOperate.match(regex)
            
            while(foundMatch) {
                foundMatch = false
                const matches = toOperate.match(regex)
                
                if(matches) {
                    matches.forEach(match => {
                        const nums = match.match(new RegExp(numRegex, "g")).map(n => parseFloat(n)), replacement = solve(...nums)
                        toOperate = toOperate.replace(match, (!isNaN(replacement) ? (replacement >= 0 ? "+" : "") + replacement : replacement))
                    })

                    foundMatch = true
                }
            }

            return toOperate
        }
    }
}



function autoCorrect(toAutoCorrect) {
    toAutoCorrect = toAutoCorrect.toLowerCase().replaceAll(" ", "").replaceAll("∞", "Infinity").replaceAll("infinity", "Infinity")
    
    if(toAutoCorrect.startsWith(".")) toAutoCorrect = "0" + toAutoCorrect
    const a = toAutoCorrect.match(/[^\d]\.\d/g)
    if(a) a.forEach(match => toAutoCorrect = toAutoCorrect.replace(match, match.charAt(0) + "0" + match.substring(1, 3)))

    const b = toAutoCorrect.match(new RegExp(`${numRegex}\\(`, "g"))
    if(b) b.forEach(match => toAutoCorrect = toAutoCorrect.replace(match, match.substring(0, match.length - 1) + "x("))

    return toAutoCorrect
}

function solveBrkts(toSolve) {
    if(toSolve.includes("(")) {
        let i = -1

        while(i++ < toSolve.length) {
            const c = toSolve.charAt(i)
            
            if(c == "(") {
                let j = i, starts = 1

                while(j++ < toSolve.length) {
                    const d = toSolve.charAt(j)

                    if(d == "(") starts++
                    else if(d == ")") starts--

                    if(starts == 0) {
                        const substr = toSolve.substring(i, j + 1), replacement = calculate(substr.substring(1, substr.length - 1))
                        toSolve = autoCorrect(toSolve.replace(substr, replacement))

                        i = -1
                        break
                    }
                }
            }
        }
    }

    return toSolve
}

const operators = new Array(
    new Operator(["÷", "/"], "dvd", (a, b) => a == 0 || b == 0 ? 0 : a / b),
    new Operator(["x", "*"], "mltp", (a, b) => a * b),
    new Operator(["+"], "plus", (a, b) => a + b),
    new Operator(["-"], "mns", (a, b) => a - b)
)

function calculate(toCalc) {
    operators.forEach(operator => toCalc = operator.operate(solveBrkts(autoCorrect(toCalc))))
    return Number(toCalc)
}


//Showing the output
function blink(clr) {
    io.animate([
        {backgroundColor: io.style.backgroundColor},
        {backgroundColor: clr},
        {backgroundColor: clr},
        {backgroundColor: clr}
    ], {
        duration: 500
    })
}

const ans = createSingleButton("=", "ans", () => {
    const result = calculate(io.value)
    
    if(!isNaN(result)) {
        io.value = result
        blink("#3bd197")
    }

    else blink("#f25a49")
})


//UI stuff
function createButton(innerText, gridArea, onclick) {
    const button = document.createElement("button")
    button.innerText = innerText
    button.style.gridArea = gridArea
    button.onclick = onclick || (() => io.value += innerText)
    button.classList.add("calc-btn", gridArea)

    return button
}

function createSingleButton(innerText, gridArea, onclick) {
    const button = createButton(innerText, gridArea, onclick)
    grid.appendChild(button)
    return button
}

function createCompoundButton(buttons, gridArea) {
    const compoundButton = document.createElement("div")
    compoundButton.style.gridArea = gridArea
    compoundButton.classList.add(gridArea)
    buttons.forEach(button => compoundButton.appendChild(button))
    grid.appendChild(compoundButton)
    return compoundButton
}

for(let n = 0; n <= 9; n++) {
    createSingleButton(n, `n${n}`)
}

createSingleButton("AC", "ac", () => io.value = "")
const del = createSingleButton("DEL", "del", () => io.value = io.value.slice(0, -1))
createSingleButton(".", "pnt")
createCompoundButton([createButton("(", "firstBrkt"), createButton(")", "secondBrkt")], "brkt")

grid.append(io)

document.onkeydown = (event => {
    switch(event.key) {
        case "Enter":
            ans.click()
            break
        case "Backspace": case "Delete":
            if(io.value.length > 0) del.click()
            break
        default:
            if(!event.ctrlKey && event.key.length == 1) io.value += event.key
    }
})

document.onpaste = (event => {
    event.preventDefault()
    io.value += event.clipboardData.getData("text")
})