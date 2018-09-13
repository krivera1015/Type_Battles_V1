document.addEventListener("DOMContentLoaded", () => {

    //login fields created
    const loginContainer = document.querySelector(".login-container")

    loginContainer.innerHTML = `
    <form id="field-area">
        <input class="form-control" type="text" placeholder="username" name="username"  autofocus/>
        <br>
        <input class="btn btn-primary btn-lg" type="submit" id="lets-type" value="Lets Type!"></input>
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
            gamePage()
        }
    })
})
