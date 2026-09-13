//traemos todos los productos

window.addEventListener("DOMContentLoaded", () => {
  getProductInAdmin();
});

const btnAgregarProducto = document.getElementById("btnAgregarProducto");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const btnFormData = document.querySelector("#btnFormData")

async function getProductInAdmin() {
  const contenedorProductos = document.getElementById("contenedorProductos");
  contenedorProductos.replaceChildren();

    fetch("http://localhost:8000/products/")
    .then((response) => response.json())
    .then((data) => {
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

  contenedorProductos.appendChild(card);
}

//funcion para obtener los datos del formulario
const getDataFromForm = () => {
  const name = document.getElementById("modalName").value;
  const quantity = document.getElementById("quantity").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("modalDescription").value;
  const category = document.getElementById("modalCategory").value;
  const image = document.getElementById("modalImage").files[0];
  
  if (!name || !quantity || !price || !description || !category || !image) {
    return { error: "Todos los campos son obligatorios" };
  }

  if (description.length < 15 || description.length > 500) {
    return { error: "La descripción debe tener entre 15 y 500 caracteres" };
  }

  return {
    data: {
      name,
      quantity,
      price,
      description,
      category,
      image,
    },
  };
};

//funcion para limpiar el formulario
const clearForm = () => {
  document.getElementById("modalName").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("price").value = "";
  document.getElementById("modalDescription").value = "";
  document.getElementById("modalCategory").value = "";
  document.getElementById("modalImage").value = "";
}

//funcion para enviar los datos del formulario al backend
const sendDataToBackend = async (data) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("quantity", data.quantity);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("image", data.image);

    const response = await fetch("http://localhost:8000/products/new-product", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const responseData = await response.json();
    console.log("Datos enviados al backend:", responseData);
    clearForm();
    modal.style.display = "none";
    getProductInAdmin();
  }
  catch (error) {
    console.error("Error al enviar los datos al backend", error);
  }
}

//evento click para abrir el modal de agregar producto
btnAgregarProducto.addEventListener("click", () => {
  modal.style.display = "flex";
  const modalTitle = document.getElementById("modalTitle");
  modalTitle.textContent = "Agregar Producto";
  btnFormData.textContent = "Agregar";
})

//evento click para cerrar el modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Cerrar el modal al hacer click afuera de él
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

//evento click para enviar los datos del formulario al backend
btnFormData.addEventListener("click", (e) => {
  e.preventDefault();
  const { data, error } = getDataFromForm();
  if (error) {
    alert(error);
    return;
  }
  sendDataToBackend(data);
});



