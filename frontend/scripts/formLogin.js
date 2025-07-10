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

  // Agregar evento de submit al formulario de inicio de sesión
  signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userData = obtenerDatosFormulario();
    const validacion = validarDatosFormulario(userData);
    console.log(obtenerDatosFormulario());

    if (!validacion) {
      alert(validacion.msg);
      return;
    }

    const response = await registrarUsuario(userData);
    manejarRespuesta(response, signInForm);
  });
});

//funcionalidades del login

let btnLogin = document.getElementById("btn_login");
let btnRegister = document.getElementById("btn_register");

//obtenemos los datos del formulario de registro
function obtenerDatosFormulario() {
  return {
    name: document.getElementById("name_register").value.trim(),
    email: document.getElementById("email_register").value.trim(),
    password: document.getElementById("constrasena_register").value.trim(),
    confirmPassword: document.getElementById("confirm_constrasena").value.trim(),
    role: document.getElementById("user_type").value.trim(),
  };
}

function validarDatosFormulario(userData) {
  if (
    !userData.name ||
    !userData.email ||
    !userData.password ||
    !userData.confirmPassword ||
    !userData.role
  ) {
    return { ok: false, msg: "Por favor completa todos los campos." };
  }

  if (userData.password !== userData.confirmPassword) {
    return {
      ok: false,
      msg: "La contraseña debe tener al menos 6 caracteres.",
    };
  }

  return { ok: true };
}

async function registrarUsuario(userData) {
  try {
    const response = await fetch("http://localhost:8000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userData.name,
        email: userData.email,
        password: userData.password,
        type: userData.role,
      }),
    });
    return response;
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    return null;
  }
}

async function manejarRespuesta(response, form) {
  if (!response.ok) {
    alert("No se pudo conectar al servidor. Por favor, intenta más tarde.");
    return;
  }

  if (response.ok) {
    const result = await response.json();
    console.log("usuario registrado: ", result);
    alert("Usuario registrado exitosamente");
    form.reset();
  } else {
    const errorData = await response.json();
    alert(errorData.detail || "Error al registrar al usuario");
  }
}
