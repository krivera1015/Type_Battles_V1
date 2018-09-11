const API = "https://www.googleapis.com/books/v1/volumes?q={PROGRAMMING}"

//fetching google books api
class GoogleAdapter {
  static getBooks(){
    return fetch(API)
    .then(res => res.json())
  }

}
