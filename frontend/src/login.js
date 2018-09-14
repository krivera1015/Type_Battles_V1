document.addEventListener("DOMContentLoaded", () => {

    //login fields created
    const loginContainer = document.querySelector(".login-container")
    const playPage = document.querySelector(".play-page")
    const playAgainDiv = document.querySelector(".play-again")

    loginContainer.innerHTML = `
    <form id="field-area">
        <input class="form-control" type="text" placeholder="username" name="username"  autofocus/>
        <br>
        <input class="btn btn-primary btn-lg" type="submit" id="lets-type" value="Lets Type!" data-toggle="modal" data-target="#myModal"></input>
    </form>
    `


    loginContainer.addEventListener('submit', (e) => {
        e.preventDefault()
        const empt = e.target["username"].value;
        if (empt === "") {
            alert("No Username Provided");
            return false;
        } else {
            loginContainer.remove()
            startTimer()
            gamePage()
        }
    })
})
