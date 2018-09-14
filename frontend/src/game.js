const playPage = document.querySelector(".play-page")


//get random function
// function getRandom(bound) {
//     return ~~(Math.random() * bound)
// }


  var timeleft = 10;
  var downloadTimer = setInterval(function(){
    document.getElementById("progressBar").value = 10- --timeleft;
    if(timeleft <= 0)
    clearInterval(downloadTimer);
  },500);



//TODO: Refactor book fetching code
//getting snippets and appending to gamePage
function gamePage() {
    GoogleAdapter.getBooks()
        .then(json => {
            console.log(json)
            // let randomIndex = getRandom(json.items.length)
            let book = json[0]
            // let snippet = book.searchInfo.textSnippet
            const snippet = json[0].quote

            playPage.innerHTML =
                `
            <div class="card">
                <div class="card-header">
                ${book.author}
                </div>
                <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <p id="snippet-box"><span id="green"></span><span id="temp-green"></span><span id="temp-red"></span><span id="current-snippet">${snippet}</span></p>
                <footer class="blockquote-footer">${book.category}</cite></footer>
                </blockquote>
                </div>
            </div>
            <br>
            <br>
            <input type="textfield" id="user-input" placeholder="Get ready, set ... TYPE"rows="1" cols="40" autofocus/>
            `
            return snippet
        })
        .then(snippet => { gameLogic(snippet) }) //starts event listeners and game logic
}
