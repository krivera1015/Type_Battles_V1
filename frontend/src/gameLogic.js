//The state of the board
let focusedWord = 0
let focusedChar = 0

let splitSnippet = []

let greenWords = []

let tmpGreen = []
let tmpRed = []

function gameLogic (snippet)  {
  splitSnippet = snippet.split(" ")

  //TODO: refactor this!
  document.body.onkeyup = (event) => {

      if (event.target.tagName === 'TEXTAREA' && alphanumericFilter()){
          console.log(event.key)
          if(document.querySelector("#temp-red").innerText !== ""){
            charToTmpRed()
          }
          else if (event.code === "Space" && tmpGreen.join("") === splitSnippet[focusedWord])  {
            drawGreenWord()
            drawSnippet()
          }
          else if (event.key === splitSnippet[focusedWord][focusedChar] )   {
              charToTmpGreen()
          }
          else{
              charToTmpRed()
          }
      }
  }



  function drawSnippet()  {
      //Draw each word to the <p>
      const completedSnippet = splitSnippet.join(" ")
      const snippetContainer = document.querySelector("#current-snippet")
      snippetContainer.innerText = completedSnippet
  }

  function drawGreenWord()  {
      //draw each word into <span> with green highlight style
      let completedWord = splitSnippet.shift()
      const greenNode = document.querySelector("#green")
      const tmpGreenNode = document.querySelector("#temp-green")

      greenWords.push(" " + completedWord)
      tmpGreenNode.innerText = ""
      greenNode.innerText = " " + tmpGreen.join()
      event.target.value = ""
  }

  function charToTmpGreen()   {
    //takes letter out of splitWord and puts it in <span> with green highlight style
    const firstChar = splitSnippet[focusedWord][focusedChar]
    const newWord = splitSnippet[focusedWord].substring(1)
    const tempGreen = document.querySelector("#temp-green")
    tmpGreen.push(firstChar)
    tempGreen.innerText = tempGreen.innerText + firstChar
    if (newWord === ""){
      splitSnippet.shift()
    }
    else {
      splitSnippet[0] = newWord
    }
    drawSnippet()
  }

  function charToTmpRed()  {
      //draw each char into <span> with red highlight style
      const firstChar = splitSnippet[focusedWord][focusedChar]
      const newWord = splitSnippet[focusedWord].substring(1)
      const tempRed = document.querySelector("#temp-red")
      tempRed.innerText = tempRed.innerText + firstChar
      splitSnippet[0] = newWord
      drawSnippet()
  }

  function alphanumericFilter() {
    return (event.keyCode !== 20 && event.keyCode !== 16 && event.keyCode !== 17 && event.keyCode !== 18)

  }
}
