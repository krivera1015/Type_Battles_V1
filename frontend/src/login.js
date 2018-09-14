document.addEventListener("DOMContentLoaded", () => {

    //login fields created
    const loginContainer = document.querySelector(".login-container")
    const playPage = document.querySelector(".play-page")

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
                     <!-- <div class="modal-header">
                       <button type="button" class="close" data-dismiss="modal">&times;</button>
                     </div> -->
                     <h4 class="modal-title">Countdown Till Race</h4>
                     <div class="modal-body">
                       <progress value="0" max="10" id="progressBar"></progress>
                     </div>
                     <!-- <div class="modal-footer">
                       <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                     </div> -->
                   </div>
                 </div>
               </div>`
               setTimeout(function() {$('#myModal').modal('hide')}, 5000);
               // setTimeout($('#myModal').modal('show'), 5000);
               // $('#myModal').modal('close')
               //playPage.innerHTML = ""
            gamePage()
        }
    })
})
