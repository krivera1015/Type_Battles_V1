const playPage = document.querySelector(".play-page")


//get random function
get_random = function (list) {
    return list[Math.floor((Math.random() * list.length))];
}




//getting snippets and appending to gamePage
function gamePage() {
    GoogleAdapter.getBooks()
    .then(json => {
        let snippet = get_random(json.items.map(book => (book.searchInfo.textSnippet)))

        playPage.innerHTML =
            `
            <img id="book-image" src=book.volumeInfo.imageLinks.small>
            <p id="snippet-box"><span id="green"></span><span id="temp-green"></span><span id="temp-red"></span><span id="current-snippet">${snippet}</span></p>
            <textArea id="user-input" placeholder="Get, set ... TYPE"rows="8" cols="100"></textArea>
            `
            return snippet
    })
    .then(snippet => {gameLogic(snippet)}) //starts event listeners and game logic
}
