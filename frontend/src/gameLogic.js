
let focusedWordIndex = 0
let focusedCharIndex = 0
let focusedWord = ""
let focusedChar = ""

let renderedSnippet = []
let originalSnippet = []
let inputBuffer = []

let correctWords = []
let greenChar = []
let redChar = []

function gameLogic(snippet) {
    const userInput = document.querySelector("#user-input")

    //Set initial state
    originalSnippet = snippet.split(" ")
    renderedSnippet = snippet.split(" ")

    //Focus first letter of first word
    focusedWord = originalSnippet[focusedWordIndex]
    focusedChar = focusedWord[focusedCharIndex]

    //Alphanumeric keys only!
    userInput.addEventListener("keyup", (event) => {
        if(userInput.value[0] === " ") {
            userInput.value = userInput.value.substring(1)
            return
        }

        if(inputBuffer.length + 1 < userInput.value.split("").length) {
            let difference = inputBuffer.length - userInput.value.split("").length + 1

            inputBuffer = inputBuffer.splice(0, inputBuffer.length - difference)
        }
        else    {
            inputBuffer = userInput.value.split("")
        }

        //God awful key validation
        if(!(!!(event.key.match(/^[a-z0-9\!\@\#\$\%\^\&\*\(\)\=\_\+\[\]\{\}\;\'\:\"\,\.\/\<\>\?\`\~\)\\\|\s\-]$/i))) && event.key !== "Backspace")  {
            return
        }
        
        //Limit the number of wrong characters someone can type
        if(userInput.value.length > focusedWord.length + 3)   {
            limitInputSize(userInput, focusedWord.length + 3)
            return
        }

        // if(!(event.key === "Backspace"))    {
        //     inputBuffer.push(event.key)
        // }
        
        console.log(inputBuffer)

        if (event.code === "Backspace") { //Backspace
            if(redChar.length === 0 && greenChar.length === 0) {
                return
            }
            else if (redChar.length === 0)  {
                let deletedChar = greenChar.pop()
                renderedSnippet[0] = deletedChar + renderedSnippet[0]
                focusedChar = focusedWord[--focusedCharIndex]
                inputBuffer.pop()
                renderBoard()
            }
            else    {
                let deletedChar = redChar.pop()
                renderedSnippet[0] = deletedChar + renderedSnippet[0]
                focusedChar = focusedWord[--focusedCharIndex]
                inputBuffer.pop()
                renderBoard()
            }
        }
        else if ((inputBuffer.join("")) === focusedWord){
            //Update visual state
            correctWords.push(focusedWord)
            renderedSnippet.shift()
            
            //Reset state
            inputBuffer = []
            greenChar = []
            
            //Focus first letter of next word
            focusedWord = originalSnippet[++focusedWordIndex]
            focusedCharIndex = 0
            focusedChar = focusedWord[focusedCharIndex]
            
            renderBoard()
            userInput.value = ""
        } 
        else if (inputBuffer[inputBuffer.length - 1] === focusedChar && redChar.length === 0) { //user types correct letter
            greenChar.push(focusedChar)
            renderedSnippet[0] = renderedSnippet[0].substring(1)
            focusedChar = focusedWord[++focusedCharIndex]

            renderBoard()
        }
        else if(inputBuffer[inputBuffer.length - 1] !== focusedChar || redChar.length !== 0){ //user types wrong letter
            redChar.push(focusedChar)
            renderedSnippet[0] = renderedSnippet[0].substring(1)
            focusedChar = focusedWord[++focusedCharIndex]

            renderBoard()
        }
    })
}

function renderBoard()  {
    // let snippetNode = document.querySelector("#snippet-box")
    let correctWordsNode = document.querySelector("#green")
    let greenCharNode = document.querySelector("#temp-green")
    let redCharNode = document.querySelector("#temp-red")
    let renderedSnippetNode = document.querySelector("#current-snippet")

    correctWordsNode.innerText = correctWords.join(" ") + " "
    greenCharNode.innerText = greenChar.join("")
    redCharNode.innerText = redChar.join("")
    renderedSnippetNode.innerText = renderedSnippet.join(" ")
}

function limitInputSize(userInput, maxLength)   {
    userInput.value = userInput.value.substring(0, maxLength);
}