document.addEventListener("DOMContentLoaded", () => {
  CrearEstrella();
});

function CrearEstrella() {
  const espacio = document.getElementById("bg_class");

  for (let i = 0; i < 100; i++) {
    const estrella = document.createElement("div");
    estrella.classList.add("estrella");

    // Posición aleatoria
    estrella.style.top = `${Math.random() * 100}%`;
    estrella.style.left = `${Math.random() * 100}%`;

    // Tamaño aleatorio
    const size = Math.random() * 3 + 1;
    estrella.style.width = `${size}px`;
    estrella.style.height = `${size}px`;

    // Delay de animación aleatorio
    estrella.style.animationDelay = `${Math.random() * 5}s`;

    espacio.appendChild(estrella);
  }
}

function crearEstrellaFugaz() {
  const estrella = document.createElement("div");
  estrella.classList.add("estrella-fugaz");

  // Posición inicial aleatoria arriba o en los bordes
  const inicioX = Math.random() * window.innerWidth * 0.8;
  const inicioY = Math.random() * window.innerHeight * 0.2;

  estrella.style.top = `${inicioY}px`;
  estrella.style.left = `${inicioX}px`;

  document.getElementById("bg_class").appendChild(estrella);

  // Eliminar después de la animación
  setTimeout(() => {
    estrella.remove();
  }, 1500);
}

// Generar una estrella fugaz cada 5–10 segundos aleatoriamente
setInterval(() => {
  if (Math.random() < 0.5) {
    // 50% de chance
    crearEstrellaFugaz();
  }
}, 3000);
