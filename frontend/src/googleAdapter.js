const API = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies&count=1"

//fetching google books api
class GoogleAdapter {
    static getBooks() {
        return fetch(API, {
            headers: {
                'X-Mashape-Key': 'XOFx10sHAMmshgK02DyjY9cyinBip1x8XPmjsnUdQX6y1GjV9a',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
    }

}
