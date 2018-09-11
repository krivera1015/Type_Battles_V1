const playPage = document.querySelector(".play-page")

//get random function
  get_random = function (list) {
    return list[Math.floor((Math.random()*list.length))];
  }

  let snippet = ''

  //getting snippets and appending to gamePage
  const gamePage = () => {
    GoogleAdapter.getBooks()
    .then(obj => {
      snippet = get_random(obj.items.map(book => {
        return(book.searchInfo.textSnippet)
      }))
      playPage.innerHTML = `
      <div id ="book-image">
        <img src=book.volumeInfo.imageLinks.small>
      </div>
        <div id="snippet-box">
        <p id="snippet">${snippet}</p>
      </div>
      <div id="textArea">
        <textArea placeholder="Get, set ... TYPE"rows="8" cols="100"></textArea>
      </div>
      `
  })
    const textKey = document.body.onkeyup =
    function comparingLetters(event){
      if (event.target.tagName === 'TEXTAREA') {
        console.log(snippet.match(event.target.value))
      }
    }

    // event.target.tagName.style.backgroundColor = "red"


}

//getting snippet into letters that will be compared
