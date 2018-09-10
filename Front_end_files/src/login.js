document.addEventListener("DOMContentLoaded", () => {

//login fields created
  const loginContainer = document.querySelector(".login-container")
  const input = document.createElement("input")

  loginContainer.innerHTML =`
  <form>
    <input type="text" placeholder="username" name="username"/>
    <input type="submit" id="lets-type" value="Lets Type!"></input>
  </form>
    `


  loginContainer.addEventListener('submit', (e) => {
    e.preventDefault()
    const empt = e.target["username"].value;
    console.log(e.target)
    if (empt == ""){
      alert("No Username Provided");
      return false;
    }else{
      loginContainer.remove()
    }
  })
})
