const playPage = document.querySelector(".play-page")


//get random function
get_random = function (list) {
    return list[Math.floor((Math.random() * list.length))];
}




//getting snippets and appending to gamePage
function gamePage() {
    GoogleAdapter.getBooks()
        .then(obj => {
            let snippet = get_random(obj.items.map(book => (book.searchInfo.textSnippet)))

            playPage.innerHTML =
                `
                <div id ="book-image">
                    <img src=book.volumeInfo.imageLinks.small>
                </div>
                    <div id="snippet-box">
                    <p ><span id="green"></span>&nbsp;<span id="temp-green"></span><span id="temp-red"></span><span id="current-snippet">${snippet}</span></p>
                </div>
                <div id="textArea">
                    <textArea placeholder="Get, set ... TYPE"rows="8" cols="100"></textArea>
                </div>
                `
                return snippet
        })
        .then(snippet => {gameLogic(snippet)}) //starts event listeners and game logic
}
