const playPage = document.querySelector(".play-page")


//get random function
function getRandom(bound) {
    return ~~(Math.random() * bound)
}


var timeleft = 10;
var downloadTimer = setInterval(function () {
    document.getElementById("progressBar").value = 10 - --timeleft;
    if (timeleft <= 0)
        clearInterval(downloadTimer);
}, 1000);



//TODO: Refactor book fetching code
//getting snippets and appending to gamePage
function gamePage() {
    GoogleAdapter.getBooks()
        .then(json => {
            console.log(json)
            let randomIndex = getRandom(json.items.length)
            let book = json.items[randomIndex]
            let snippet = book.searchInfo.textSnippet

            playPage.innerHTML =
                `
            <div class="image"
                <img src=${book.volumeInfo.imageLinks.smallThumbnail}>
            </div>
            <div class="card">
                <div class="card-header">
                ${book.volumeInfo.title}
                </div>
                <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <p id="snippet-box"><span id="green"></span><span id="temp-green"></span><span id="temp-red"></span><span id="current-snippet">${snippet}</span></p>
                <footer class="blockquote-footer">${book.volumeInfo.authors[0]}</cite></footer>
                </blockquote>
                </div>
            </div>
            <br>
            <br>
            <textArea id="user-input" placeholder="Get ready, set ... TYPE"rows="1" cols="40"></textArea>
            `
            return snippet
        })
        .then(snippet => { gameLogic(snippet) }) //starts event listeners and game logic
}
