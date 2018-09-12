//The state of the board
    let focusedWord = 0
    let focusedChar = 0

    let splitSnippet = snippet.split(" ")

    let greenWords = []

    let tmpGreen = []
    let tmpRed = []




//TODO: refactor this!
document.body.onkeyup = (event) => {
    // if (event.target.tagName === 'TEXTAREA' && snippet.match(new RegExp(`^${event.target.value}`))) {
    //     console.log(snippet.match(new RegExp(`^${event.target.value}`)))
    //     let match = snippet.match(new RegExp(`^${event.target.value}`))[0]

    if (event.target.tagName === 'TEXTAREA'){
        if (event.code === "Space" && tmpGreen.join() === splitSnippet[focusedWord])  {
            let completedWord = splitSnippet.shift()
            greenWords.push(completedWord)

            drawBoard()

            event.target.value = ""
        } else if (event.code === splitSnippet[focusedWord][focusedChar])   {
            focusedChar++
            charToTmpGreen(splitSnippet[focusedWord][focusedChar])
            drawBoard()
        } else{
            charTpTmpRed(splitSnippet[focusedWord][focusedChar])
            drawBoard()
        }
    }
}




function drawBoard()    {
    drawSnippet()
    drawGreenWord()
    drawTmpGreen()
    drawTmpRed()
}

function drawSnippet(splitSnippet)  {
    //Draw each word to the <p>
}

function drawGreenWord(greenWords)  {
    //draw each word into <span> with green highlight style
}

function drawRedWord(redWords)  {
    //draw each word into <span> with red highlight style
}

function charToTmpGreen()   {
    //takes letter out of splitWord and puts it in <span> with green highlight style
}
