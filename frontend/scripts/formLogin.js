let btnLoginToggle = document.querySelector(".btn_login_toggle");
let btnSignInToggle = document.querySelector(".btn_signIn_toggle");

let loginForm = document.getElementById("login_form");
let signInForm = document.getElementById("signIn_form");

//estilos dinamicos para el login y el registro de usuario

btnLoginToggle.addEventListener("click", () => {
  loginForm.style.display = "flex";
  signInForm.style.display = "none";
  btnLoginToggle.classList.add("active-tab");
  btnSignInToggle.classList.remove("active-tab");
});

btnSignInToggle.addEventListener("click", () => {
  signInForm.style.display = "flex";
  loginForm.style.display = "none";
  btnSignInToggle.classList.add("active-tab");
  btnLoginToggle.classList.remove("active-tab");
});

window.addEventListener("DOMContentLoaded", () => {
  loginForm.style.display = "flex";
  signInForm.style.display = "none";
  btnLoginToggle.classList.add("active-tab");
  btnSignInToggle.classList.remove("active-tab");
});

//funcionalidades del login

let name = document.getElementById("name").value;
let email = document.getElementById("email").value;
let password = document.getElementById("constrasena").value;
let confirmPassword = document.getElementById("confirm_constrasena").value;
let rol = document.getElementById("user_type").value;

let btnLogin = document.getElementById("btn_login");
let btnRegister = document.getElementById("btn_register");

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userData = {
    email: email,
    password: password,
    rol: rol,
    name: name,
  };

  try {
    const response = await fetch("http://localhost:8000/user/register",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || "Error al registrar al usuario")
    }

    const result = await response.json()
    alert("Usuario registrado exitosamente")
    console.log(result);


  } catch (error) {
    console.error("Error",error);
    alert("Error al registrar un usuario")
  }
});
