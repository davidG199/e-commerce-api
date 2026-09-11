const user = JSON.parse(localStorage.getItem("User"))
const liIngresar = document.getElementById("li_ingresar")
const liUser = document.getElementById("li_user")

//navbar dinamico

if (!user) {
    liUser.classList.remove("show")

    liIngresar.classList.add("show")
    liIngresar.innerHTML = `
        <a href="./pages/login-register.html" id="btn_ingresar"> Ingresar </a>
    `

} else{
    liIngresar.classList.remove("show")
    liUser.classList.add("show")
    if (user.type === "admin") {
        liUser.innerHTML = `<a href="./pages/admin.html">${user.username}</a>`;
    } else {
        liUser.innerHTML = `<a href="#">${user.username}</a>`;
    }
}






