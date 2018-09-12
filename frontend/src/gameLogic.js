//The state of the board
let focusedWord = ""
let focusedChar = ""

let splitSnippet = []

let greenWords = []

let tmpGreen = []
let tmpRed = []



function gameLogic(snippet) {
    splitSnippet = snippet.split(" ")
    focusedWord = splitSnippet[0]
    focusedChar = focusedWord[0]
    let userInput = document.querySelector("#user-input")

    //TODO: refactor this!
    userInput.onkeyup = (event) => {
        if (event.target.tagName === 'TEXTAREA' && alphanumericFilter()) {
            

            console.log(userInput.value.slice(-1), focusedChar)

            if (event.code === "Backspace") {
                backspace()
            }
            else if (document.querySelector("#temp-red").innerText !== "") {
                charToTmpRed()
            }
            else if (userInput.value.slice(-1) === " " && tmpGreen.join("") === focusedWord) {
                drawGreenWord()
                drawSnippet()
            }
            else if (userInput.value.slice(-1) === focusedChar) {
                charToTmpGreen()
            }
            else {
                charToTmpRed()
            }
        }
    }



    function drawSnippet() {
        //Draw each word to the <p>
        const completedSnippet = splitSnippet.join(" ")
        const snippetContainer = document.querySelector("#current-snippet")
        snippetContainer.innerText = completedSnippet
    }

    function drawGreenWord() {
        //draw each word into <span> with green highlight style
        // let completedWord = splitSnippet.shift()
        const greenNode = document.querySelector("#green")
        const tmpGreenNode = document.querySelector("#temp-green")
        
        greenWords.push(focusedWord + " ")
        tmpGreenNode.innerText = ""
        greenNode.innerText = greenWords.join(" ")
        focusedWord = splitSnippet[0]
        focusedChar = focusedWord[0]
        tmpGreen = []
        event.target.value = ""
    }

    function charToTmpGreen() {
        //takes letter out of splitWord and puts it in <span> with green highlight style
        const firstChar = focusedChar
        const newWord = splitSnippet[0].substring(1)
        const tmpGreenNode = document.querySelector("#temp-green")

        tmpGreen.push(firstChar)
        tmpGreenNode.innerText = tmpGreenNode.innerText + firstChar

        if (newWord === "") {
            splitSnippet.shift()
        }
        else {
            splitSnippet[0] = newWord
        }
        
        focusedChar = newWord[0]
        drawSnippet()
    }

    function charToTmpRed() {
        //draw each char into <span> with red highlight style
        const firstChar = focusedChar
        const newWord = splitSnippet[0].substring(1)
        const tempRedNode = document.querySelector("#temp-red")
        tempRedNode.innerText = tempRedNode.innerText + firstChar
        tmpRed.push(firstChar)
        splitSnippet[0] = newWord

        focusedChar = newWord[0]
        drawSnippet()
    }

    function backspace()    {
        if (tmpRed.length === 0 && tmpGreen === 0)    {
            return
        }
        else if (tmpRed.length === 0)   {
            let fixedLetter = tmpGreen.pop()
            const tempGreenNode = document.querySelector("#temp-green")

            splitSnippet[0] = fixedLetter + splitSnippet[0]
            tempGreenNode.innerText = tmpGreen.join("")
            focusedWord = splitSnippet[0]
            focusedChar = focusedWord[0]
            drawSnippet()
        }
        else    {
            let fixedLetter = tmpRed.pop()
            const tempRedNode = document.querySelector("#temp-red")

            splitSnippet[0] = fixedLetter + splitSnippet[0]
            tempRedNode.innerText = tmpRed.join("")
            focusedWord = splitSnippet[0]
            focusedChar = focusedWord[0]
            drawSnippet()
        }
    }

    function alphanumericFilter() {
        return (event.keyCode !== 20 && event.keyCode !== 16 && event.keyCode !== 17 && event.keyCode !== 18)

    }
}
