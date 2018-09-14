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
            playPage.innerHTML = `<div class="modal fade" id="myModal" role="dialog">
                 <div class="modal-dialog modal-sm">
                   <div class="modal-content">
                     <h4 class="modal-title">Loading</h4>
                     <div class="modal-body">
                       <progress value="0" max="10" id="progressBar"></progress>
                     </div>
                   </div>
                 </div>
               </div>`
               setTimeout($('#myModal').modal('show'), 2000);
               setTimeout(function() {$('#myModal').modal('hide')}, 2000);
               // $('#myModal').modal('close')
               playPage.innerHTML = ""
               setTimeout(startTimer, 2000);
            gamePage()

        }
    })
})
