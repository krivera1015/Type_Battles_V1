//The state of the board
let focusedWord = ""
let focusedChar = ""

let splitSnippet = []
let Snippetbuffer = []

let greenWords = []

let tmpGreen = []
let tmpRed = []



function gameLogic(snippet) {
    splitSnippet = snippet.split(" ")
    Snippetbuffer = splitSnippet
    focusedWord = splitSnippet[0]
    focusedChar = focusedWord[0]
    let userInput = document.querySelector("#user-input")

    //TODO: refactor this!
    userInput.addEventListener("keypress", (event) => {
            console.log(event.key)
            
            if (document.querySelector("#temp-red").innerText !== "") { //everything is wrong after the first wrong
                charToTmpRed()
            }
            else if (event.code === "Space" && tmpGreen.join("") === focusedWord) { //user works on one word at a time
                drawGreenWord()
                drawSnippet()
            }
            else if (event.key === focusedChar) { //user types correct letter
                tmpGreen.push(focusedChar)
                charToTmpGreen()
            }
            else { //user types wrong letter
                charToTmpRed()
            }
    })
    userInput.addEventListener("keyup", (event) => {
        if (event.code === "Backspace") { //Backspace
            backspace()
        }
    })

    function charToTmpGreen() {
        //takes letter out of splitWord and puts it in <span> with green highlight style
        const firstChar = focusedChar
        const newWord = splitSnippet[0].substring(1)
        const tmpGreenNode = document.querySelector("#temp-green")

        tmpGreenNode.innerText = tmpGreenNode.innerText + firstChar

        if (newWord === "") {
            tmpGreenNode.innerText += " "
            splitSnippet.shift()
        }
        else {
            splitSnippet[0] = newWord
        }
        
        focusedChar = newWord[0]
        drawSnippet()
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

    function charToTmpRed() {
        //draw each char into <span> with red highlight style
        if(splitSnippet[0].substring(1) === ""){
            return
        }
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
        if (tmpRed.length === 0 && tmpGreen.length === 0)    {
            return
        }
        else if (tmpRed.length === 0)   {
            const tempGreenNode = document.querySelector("#temp-green")

            let fixedLetter = tmpGreen.pop()

            splitSnippet[0] = fixedLetter + splitSnippet[0]
            tempGreenNode.innerText = tempGreenNode.innerText.substring(0, tempGreenNode.innerText.length -1 )
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
