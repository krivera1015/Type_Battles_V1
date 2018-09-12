const playPage = document.querySelector(".play-page")

//get random function
get_random = function (list) {
    return list[Math.floor((Math.random() * list.length))];
}

let snippet = ''


//getting snippets and appending to gamePage
function gamePage() {
    GoogleAdapter.getBooks()
        .then(obj => {
            snippet = get_random(obj.items.map(book => (book.searchInfo.textSnippet)))

            playPage.innerHTML = 
                `
                <div id ="book-image">
                    <img src=book.volumeInfo.imageLinks.small>
                </div>
                    <div id="snippet-box">
                    <p id="snippet"><span id="green"></span><span id="red"></span>${snippet}</p>
                </div>
                <div id="textArea">
                    <textArea placeholder="Get, set ... TYPE"rows="8" cols="100"></textArea>
                </div>
                `
        })
        .then(gameLogic()) //starts event listeners and game logic
}
