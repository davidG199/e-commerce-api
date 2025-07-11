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

  // Agregar evento de submit al formulario de registro de usuario
  signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtenemos los datos del formulario de registro
    const userData = obtenerDatosFormulario();
    // Validamos los datos del formulario
    const validacion = validarDatosFormulario(userData);
    console.log(obtenerDatosFormulario());

    // Si la validación falla, mostramos un mensaje de error y detenemos el proceso
    if (!validacion.ok) {
      alert(validacion.msg);
      return;
    }

    // Si la validación es exitosa, intentamos registrar al usuario
    // y manejamos la respuesta del servidor
    const response = await registrarUsuario(userData);
    manejarRespuesta(response, signInForm);
  });

  // Agregar evento de submit al formulario de inicio de sesión
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userData = obtenerDatosLogin();

    if (!userData.email || !userData.password) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const response = await iniciarSesion(userData);
    await manejarRespuestaLogin(response);
  });
});

let btnLogin = document.getElementById("btn_login");
let btnRegister = document.getElementById("btn_register");

//obtenemos los datos del formulario de registro
function obtenerDatosFormulario() {
  return {
    name: document.getElementById("name_register").value.trim(),
    email: document.getElementById("email_register").value.trim(),
    password: document.getElementById("constrasena_register").value.trim(),
    confirmPassword: document
      .getElementById("confirm_constrasena")
      .value.trim(),
    role: document.getElementById("user_type").value.trim(),
  };
}

//funcion para validar los datos del formulario
// Esta función verifica que todos los campos del formulario estén completos y que las contraseñas coincidan
// Si hay algún error, devuelve un objeto con un mensaje de error; si todo es correcto, devuelve un objeto con ok: true
function validarDatosFormulario(userData) {
  //validacion de contraseña
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

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
    return { ok: false, msg: "Las contraseñas no coinciden." };
  }

  if (!passwordRegex.test(userData.password)) {
    return {
      ok: false,
      msg: "La contraseña debe tener al maximo 8 caracteres, una mayuscula y al menos un numero",
    };
  }

  if (userData.name.length < 3) {
    return {
      ok: false,
      msg: "El nombre de usuario debe contener 3 o más caracteres",
    };
  }

  return { ok: true };
}

//funcion para registrar el usuario
// Esta función envía una solicitud POST al servidor para registrar un nuevo usuario
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

//funcion para manejar la respuesta del servidor
// Esta función maneja la respuesta del servidor después de intentar registrar un usuario
async function manejarRespuesta(response, form) {
  // Si la respuesta es exitosa, se muestra un mensaje de éxito y se reinicia el formulario
  // Si hay un error, se muestra un mensaje de error al usuario
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

//funcion para obtener los datos del formulario de inicio de sesion
function obtenerDatosLogin() {
  return {
    email: document.getElementById("email_login").value.trim(),
    password: document.getElementById("contrasena_login").value.trim(),
  };
}

//funcion para iniciar sesion
// Esta función envía una solicitud POST al servidor para iniciar sesión con las credenciales del usuario
async function iniciarSesion(userData) {
  const formBody = new URLSearchParams();
  formBody.append("username", userData.email);
  formBody.append("password", userData.password);

  try {
    const response = await fetch("http://localhost:8000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    });
    return response;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return null;
  }
}

//Esta función maneja la respuesta del servidor después de intentar iniciar sesión
// Si la respuesta es exitosa, guarda el token de acceso en localStorage y muestra un mensaje de éxito
async function manejarRespuestaLogin(response) {
  if (!response) {
    alert("Error en el servidor.");
    return;
  }

  if (!response.ok) {
    alert("Contraseña o usuario incorrecto");
    return;
  }

  const data = await response.json();
  const token = data.access_token;

  // Guardamos el token en localStorage
  localStorage.setItem("access_token", token);

  alert("Inicio de sesión exitoso!");
  await userInfByAccessToken();
  // Redirigimos al usuario a la página principal o a donde sea necesario
  window.location.href = "/frontend/index.html";
}

//funcion para traer la informacion del usuario logeado usando el token de acceso que devuelve la api
async function userInfByAccessToken() {
  const token = localStorage.getItem("access_token");

  const response = await fetch("http://localhost:8000/user/current-user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const userInfo = await response.json();
  console.log(userInfo);
  localStorage.setItem("User", JSON.stringify(userInfo));
}
