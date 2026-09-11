//traemos todos los productos

window.addEventListener("DOMContentLoaded", () => {
  getProductInAdmin();
});

const btnAgregarProducto = document.getElementById("btnAgregarProducto");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

async function getProductInAdmin() {
    fetch("http://localhost:8000/products/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((producto, index) => {
        HTMLProductInAdmin(producto, index+ 1);
      });
    })
    .catch((error) => console.error("Error al obtener los datos", error));
}

function HTMLProductInAdmin(producto, index) {
  const card = document.createElement("div");
  card.classList.add("producto_admin");


  const contenedorProductos = document.getElementById("contenedorProductos");

  const nombreProducto = producto.name;
  const descripcionProducto = producto.description;
  const precioProducto = producto.price;
  const categoriaProducto = producto.category;
  const imagenProducto = producto.image_url.startsWith("http")
    ? producto.image_url
    : `http://localhost:8000/${producto.image_url}`;

  card.innerHTML = `
        <div class="producto-info">
          <span>
            <p class="producto-numero"> ${index}</p>
            <h3>${nombreProducto}</h3>
          </span>
          <span>
            <button id="btn_editar">
              <img src="../icons/pencil.svg" alt="Editar" />
            </button>
            <button id="btn_eliminar">
              <img src="../icons/delete.svg" alt="Eliminar" />
            </button>
          </span>
        </div>
      `;

  //desde aca abrimos o cerramos el modal
  /*card.addEventListener("click", () => {
    modalCard(producto);
  });*/

  contenedorProductos.appendChild(card);
}

btnAgregarProducto.addEventListener("click", () => {
  modal.style.display = "block";
})

//evento click para cerrar el modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Cerrar el modal al hacer click afuera de él
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});





