document.addEventListener("DOMContentLoaded", function () {
  getProducts();
});

//llamar a la api

function getProducts() {
  fetch("http://localhost:8000/products/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((producto) => {
        cardProduct(producto);
      });
    })
    .catch((error) => console.error("Error al obtener los datos", error));
}

//creamos las cards dinamicamente
function cardProduct(producto) {
  const card = document.createElement("div");
  card.classList.add("card_producto");

  const contenedorProductos = document.getElementById("contenedorProductos");

  const nombreProducto = producto.name;
  const descripcionProducto = producto.description;
  const precioProducto = producto.price;
  const categoriaProducto = producto.category;
  const imagenProducto = producto.image_url.startsWith("http")
    ? producto.image_url
    : `http://localhost:8000/${producto.image_url}`;

  card.innerHTML = `
        <img src="${imagenProducto}" alt="${producto.name}";" />
        <div>
          <h3>${nombreProducto}</h3>
          <p>${descripcionProducto}</p>
          <span>
            <p>$${precioProducto}</p>
            <p>${categoriaProducto}</p>
          </span>
        </div>
      `;

  //desde aca abrimos o cerramos el modal
  card.addEventListener("click", () => {
    modalCard(producto);
  });

  contenedorProductos.appendChild(card);
}

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

//funcion para crear los modales
const modalCard = (producto) => {
  document.getElementById("modalImg").src = producto.image_url;
  document.getElementById("modalName").textContent = producto.name;
  document.getElementById("modalDescription").textContent =
    producto.description;
  document.getElementById("modalPrice").textContent = producto.price;
  document.getElementById("modalCategory").textContent = producto.category;
  document.getElementById("modalStock").textContent = producto.quantity;

  modal.style.display = "flex";
};

//evento click para cerrar el modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Cerrar el modal al hacer click afuera de él
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});
