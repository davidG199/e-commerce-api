document.addEventListener("DOMContentLoaded", () => {
  const liIngresar = document.getElementById("li_ingresar")
  const liUser = document.getElementById("li_user")

  if(!liUser){
    return;
  }

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("User"))
  } catch (error) {
    localStorage.removeItem("User")
  }

  const isInsidePages = window.location.pathname.includes("/pages/")
  const homePath = isInsidePages ? "../index.html" : "./index.html"
  const loginPath = isInsidePages 
  ? "../pages/login-register.html"
  : "./pages/login-register.html"
  const profilePath = isInsidePages 
  ? "../pages/profile.html"
  : "./pages/profile.html"
  const adminPath = isInsidePages 
  ? "../pages/admin.html"
  : "./pages/admin.html"

  if(!user){
    if(liIngresar){
      liIngresar.innerHTML = `
        <a href="${loginPath}" id="btn_ingresar">Ingresar</a>
      `
      liIngresar.style.display = "block"
    }

    liUser.innerHTML = "";
    return
  }

  if(liIngresar){
    liIngresar.innerHTML = "";
    liIngresar.style.display = "none"
  }

  const panelLink = user.type === "admin" 
  ? `<a href="${adminPath}">Panel de Administración</a>`
  : `<a href="${profilePath}">Perfil</a>`;

  liUser.innerHTML = `
    <button type="button" id="btn_user" aria-expanded="false">
      ${user.username}
    </button>

    <div class="panel" id="user_panel">
      <ul class="panel_ul">
        <li>${panelLink}</li>
        <li>
          <button type="button" id="btn_logout">Cerrar sesion</button>
        </li>
      </ul>
    </div>

  `;

  liUser.style.display = "block";

  const btnUser = document.getElementById("btn_user")
  const userPanel = document.getElementById("user_panel")
  const btnLogout = document.getElementById("btn_logout")

  btnUser.addEventListener("click", (event) => {
    event.stopPropagation();

    const isOpen = userPanel.classList.toggle("panel-visible")
    btnUser.setAttribute("aria-expanded", String(isOpen))
  });

  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("User")
    window.location.href = homePath
  });

  document.addEventListener("click", (event) =>{
    if(!liUser.contains(event.target)){
      userPanel.classList.remove("panel-visible")
      btnUser.setAttribute("aria-expanded", "false")
    }
  })
})




//navbar dinamico

if (!user) { // si no hay usuario logueado
    // mostrar boton de ingresar
    liUser.classList.remove("show")
    liIngresar.classList.add("show")
    liIngresar.innerHTML = `<a href="./pages/login-register.html" id="btn_ingresar"> Ingresar </a>`

    } else{ // si hay usuario logueado ejecutamos la funcion para mostrar el panel de usuario
    showUserPanel()
}

function showUserPanel(){
  liIngresar.classList.remove("show") // ocultar boton de ingresar
  liUser.classList.add("show") // mostrar boton de usuario logueado


    if (user.type === "admin") {
        liUser.innerHTML = `<a href="./pages/admin.html">${user.username}</a>`;
    } else {
        liUser.innerHTML = `<a href="#">${user.username}</a>`;
    }

    let spanPanel = document.createElement("span")
    spanPanel.classList.add("panel")
    spanPanel.innerHTML = `<ul class="panel_ul">
                            <li><a href="./pages/profile.html">Perfil</a></li>
                            <li><a href="#" id="btn_logout">Cerrar sesión</a></li>
                          </ul>`

    liUser.appendChild(spanPanel)

    const btnLogout = document.getElementById("btn_logout")
    btnLogout.addEventListener("click", () => {
        localStorage.removeItem("User")
        location.reload()
    })
}







