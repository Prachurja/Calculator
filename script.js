//The "Cannot access before initialization"s
const grid = document.querySelector(".calc-grid"),
io = document.createElement("textarea")


//Calculation stuff
const temp = `((?<!(\\)|\\d))(-|\\+)?)\\d+(\\.\\d+)?`,
numRegex = `(${temp}e(-|\\+)?\\d+|${temp}|Infinity)`

class Operator {
    constructor(symbols, gridArea, solve) {
        createBtn(symbols[0], gridArea)
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
    new Operator(["÷", "/"], "dvd", (a, b) => a / b),
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

const ans = createBtn("=", "ans", () => {
    const result = calculate(io.value)
    
    if(!isNaN(result)) {
        io.value = result
        blink("#3bd197")
    }

    else blink("#f25a49")
})

io.onkeydown = (event) => {
    if(event.key == "Enter") {
        ans.click()
        event.preventDefault()
    }
}


//UI stuff
function createBtn(innerText, gridArea, onclick) {
    const btn = document.createElement("button")
    btn.innerText = innerText
    btn.style.gridArea = gridArea
    btn.onclick = onclick || (() => {
        const start = io.selectionStart, end = io.selectionEnd
        io.value = io.value.substring(0, start) + innerText.toString() + io.value.substring(end, io.value.length)
        io.selectionStart = io.selectionEnd = end + 1
    })

    grid.appendChild(btn)
    return btn
}

for(let n = 0; n <= 9; n++) {
    createBtn(n, `n${n}`)
}

createBtn("AC", "ac", () => io.value = "")
createBtn("DEL", "del", () => {
    const end = io.selectionEnd
    io.value = io.value.substring(0, end - 1) + io.value.substring(end, io.value.length)
    io.selectionStart = io.selectionEnd = end - 1
})
createBtn(".", "pnt")
createBtn("()", "brkt")

io.style.gridArea = "io"
io.className = "io"
io.autocapitalize = "off"
io.autocorrect = "off"
io.autocomplete = "off"
io.autofocus = true
io.spellcheck = false

let touchDevice = false
io.ontouchstart = () => touchDevice = true
window.onresize = () => touchDevice = false
io.onblur = () => if(touchDevice) io.focus()

grid.append(io)
