const playPage = document.querySelector(".play-page")

//get random function
get_random = function (list) {
  return list[Math.floor((Math.random()*list.length))];
}

//getting snippets and appending to gamePage
const gamePage = () => {
  GoogleAdapter.getBooks()
  .then(obj => {
    const book = obj.items.map(book => {
      return book.searchInfo.textSnippet
    })
    playPage.innerHTML = `
    <div id ="book-image">
      <img src=book.volumeInfo.imageLinks.small>
    </div>
    <div id="snippet">
      <p>${get_random(book)}</p>
    </div>
    <textArea placeholder="Get, set ... TYPE"rows="8" cols="100"></textArea>
    `
  })
}
