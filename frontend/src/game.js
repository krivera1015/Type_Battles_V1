const playPage = document.querySelector(".play-page")

//get random function
get_random = function (list) {
    return list[Math.floor((Math.random() * list.length))];
}

let snippet = ''
let splitSnippet = ''

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
                    <p><span id="green"></span><span id="red"></span><span id="snippet">${snippet}</span></p>
                </div>
                <div id="textArea">
                    <textArea placeholder="Get, set ... TYPE"rows="8" cols="100"></textArea>
                </div>
                `
        })
        .then(gameLogic()) //starts event listeners and game logic
}

function gameLogic()    {
    document.body.onkeyup = (event) => {
            const green = document.querySelector('#green')
            const red = document.querySelector('#red')
            const snippetSpan = document.querySelector('#snippet')
            if (event.target.tagName === 'TEXTAREA' && !["Shift", "CapsLock"].includes(event.key)) {
                const matchArr = snippet.match(new RegExp(`^${event.target.value}`))
                const match = matchArr ? matchArr[0] : null
                if (match) {
                  green.innerText += match.slice(green.innerText.length)
                  snippetSpan.innerText = snippet.slice(match.length)
                  console.log(match);
                  // snippet = snippet.slice(0, match.length - 1)
                  // snippetSpan.innerText = snippetSpan.innerText.slice(match.length)
                } else {
                  red.innerText = snippet[green.innerText.length + red.innerHTML.length]
                  snippetSpan.innerText = snippet.slice(green.innerText.length + red.innerText.length)
                }
            }
        }
}

//getting snippet into letters that will be compared
// if (event.code === "Space")  {
//     event.target.value = ""
// }
