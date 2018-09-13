
let focusedWordIndex = 0
let focusedCharIndex = 0
let focusedWord = ""
let focusedChar = ""

let renderedSnippet = []
let originalSnippet = []
let inputBuffer = []
let lastState = []

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

    userInput.addEventListener("keydown", (event) => {
        if (event.code === "Backspace") { //Backspace
            if(redChar.length === 0 && greenChar.length === 0) {
                return
            }
            else if (redChar.length === 0)  {
                let deletedChar = greenChar.pop()
                renderedSnippet[0] = deletedChar + renderedSnippet[0]
                focusedCharIndex--
                if(focusedCharIndex < 0)    {
                    focusedCharIndex = 0
                }
                focusedChar = focusedWord[focusedCharIndex]
                renderBoard()
            }
            else    {
                let deletedChar = redChar.pop()
                renderedSnippet[0] = deletedChar + renderedSnippet[0]
                focusedCharIndex--
                if(focusedCharIndex < 0)    {
                    focusedCharIndex = 0
                }
                focusedChar = focusedWord[focusedCharIndex]
                renderBoard()
            }
        }
    })
    
    function gameLoop() {
        if(userInput.value[0] === " ") {
            userInput.value = userInput.value.substring(1)
            return
        }

        lastState = inputBuffer
        inputBuffer = userInput.value.split("")

        if(lastState.length > inputBuffer.length)    {
            console.log(true)
        }
        else    {
            console.log(false)
        }

        if(lastState.equals(inputBuffer) || userInput.value === "" || lastState.length > inputBuffer.length)   {
            return
        }

        
        //Limit the number of wrong characters someone can type
        if(userInput.value.length > focusedWord.length + 3)   {
            limitInputSize(userInput, focusedWord.length + 3)
            return
        }
        
        console.log(inputBuffer)

        if ((inputBuffer.join("")) === focusedWord){
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
            if(renderedSnippet[0] !== ""){
                renderedSnippet[0] = renderedSnippet[0].substring(1)
            }
            focusedCharIndex++
            if(focusedCharIndex > focusedWord.length){
                focusCharIndex = focusedWord.length - 1
            }
            focusedChar = focusedWord[focusedCharIndex]

            renderBoard()
        }
    }

    window.setInterval(gameLoop, 1)
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

// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});