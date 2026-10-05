//traemos todos los productos

window.addEventListener("DOMContentLoaded", () => {
  getProductInAdmin();
});

const btnAgregarProducto = document.getElementById("btnAgregarProducto");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const btnFormData = document.querySelector("#btnFormData");
const contenedorProductos = document.getElementById("contenedorProductos");
const modalConfirmDelete = document.getElementById("modalConfirmDelete");
const btnConfirmDelete = document.getElementById("btnConfirmDelete");
const btnCancelDelete = document.getElementById("btnCancelDelete");

let productIdToDelete = null;
let productIdToEdit = null;

async function getProductInAdmin() {
  const contenedorProductos = document.getElementById("contenedorProductos");
  contenedorProductos.replaceChildren();

  fetch("http://localhost:8000/products/")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((producto, index) => {
        HTMLProductInAdmin(producto, index + 1);
      });
    })
    .catch((error) => console.error("Error al obtener los datos", error));
}

//funion para crear el HTML de cada producto en el contenedor de productos
function HTMLProductInAdmin(producto, index) {
  const card = document.createElement("div");
  card.classList.add("producto_admin");

  card.innerHTML = `
        <div class="producto-info">
          <span>
            <p class="producto-numero"> ${index}</p>
            <h3>${producto.name}</h3>
          </span>
          <span>
            <button class="btn-editar" data-product-id="${producto.id}">
              <img src="../icons/pencil.svg" alt="Editar" />
            </button>
            <button class="btn-eliminar" data-product-id="${producto.id}">
              <img src="../icons/delete.svg" alt="Eliminar" />
            </button>
          </span>
        </div>
      `;

  contenedorProductos.appendChild(card);
}

//funcion para obtener los datos del formulario
const getDataFromForm = ({ requireImage = true } = {}) => {
  const name = document.getElementById("modalName").value.trim();
  const quantity = document.getElementById("quantity").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("modalDescription").value.trim();
  const category = document.getElementById("modalCategory").value;
  const image = document.getElementById("modalImage").files[0];

  if (
    !name ||
    !quantity ||
    !price ||
    !description ||
    !category ||
    (!image && requireImage)
  ) {
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
};

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
  } catch (error) {
    console.error("Error al enviar los datos al backend", error);
  }
};

//funcion para eliminar un producto segun su id
const deleteProduct = async (productId) => {
  try {
    const response = await fetch(
      `http://localhost:8000/products/delete/${productId}`,
      {
        method: "DELETE",
      },
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.mensaje || "Error al eliminar el producto");
    }

    alert(responseData.mensaje);
    await getProductInAdmin();
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    alert(error.message || "Error al eliminar el producto");
  }
};

const getDataForEditProduct = async (productId) => {
  try {
    const response = await fetch(
      `http://localhost:8000/products/id/${productId}`,
    );

    const product = await response.json();

    if (!response.ok) {
      throw new Error(
        product.mensaje || "Error al obtener los datos del producto",
      );
    }

    productIdToEdit = productId;

    //llenamos el formulario con los datos del producto
    document.getElementById("modalName").value = product.name;
    document.getElementById("quantity").value = product.quantity;
    document.getElementById("price").value = product.price;
    document.getElementById("modalDescription").value = product.description;
    document.getElementById("modalCategory").value = product.category;

    // modal.style.display = "flex";
    document.getElementById("modalTitle").textContent = "Editar Producto";
    btnFormData.textContent = "Editar";
    modal.style.display = "flex";
  } catch (error) {
    console.error("Error al editar el producto:", error);
    alert(error.message || "Error al editar el producto");
  }
};

const editProduct = async (productId, data) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("quantity", data.quantity);
  formData.append("price", data.price);
  formData.append("description", data.description);
  formData.append("category", data.category);

  if (data.image) {
    formData.append("image", data.image);
  }

  const response = await fetch(
    `http://localhost:8000/products/update/${productId}`,
    {
      method: "PATCH",
      body: formData,
    },
  );

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.mensaje || "Error al actualizar el producto");
  }

  return responseData;
};

// -----------EVENTOS-----------------

//evento click para abrir el modal de agregar producto
btnAgregarProducto.addEventListener("click", () => {
  productIdToEdit = null;
  clearForm();

  modal.style.display = "flex";
  document.getElementById("modalTitle").textContent = "Agregar Producto";
  btnFormData.textContent = "Agregar";
});

//evento click para cerrar el modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Cerrar el modal al hacer click afuera de él
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

//evento click para enviar los datos del formulario al backend
btnFormData.addEventListener("click", async (e) => {
  e.preventDefault();

  const { data, error } = getDataFromForm({
    requiereImage: productIdToEdit === null,
  });

  if (error) {
    alert(error);
    return;
  }

  try {
    if (productIdToEdit === null) {
      await sendDataToBackend(data);
    } else {
      await editProduct(productIdToEdit, data);
      alert("Producto editado correctamente");
    }

    clearForm();
    productIdToEdit = null;
    modal.style.display = "none";
    await getProductInAdmin();
  } catch (error) {
    console.error("Error al enviar los datos al backend", error);
    alert(error.mensaje || "Error de servidor");
  }

  sendDataToBackend(data);
});

//evento click para eliminar un producto desde el contenedor de productos
contenedorProductos.addEventListener("click", (e) => {
  const deleteButton = e.target.closest(".btn-eliminar");
  const editButton = e.target.closest(".btn-editar");

  if (editButton) {
    const productId = editButton.dataset.productId;
    getDataForEditProduct(productId);
    return;
  }

  if (deleteButton) {
    productIdToDelete = deleteButton.dataset.productId;
    modalConfirmDelete.style.display = "flex";
  }
});

//evento click para confirmar la eliminación de un producto
btnConfirmDelete.addEventListener("click", async () => {
  if (!productIdToDelete) return;

  await deleteProduct(productIdToDelete);

  productIdToDelete = null;
  modalConfirmDelete.style.display = "none";
});

//evento click para cancelar la eliminación de un producto y cerrar el modal
btnCancelDelete.addEventListener("click", () => {
  productIdToDelete = null;
  modalConfirmDelete.style.display = "none";
});

//evento click para cerrar el modal de confirmación de eliminación al hacer click afuera de él
modalConfirmDelete.addEventListener("click", (e) => {
  if (e.target === modalConfirmDelete) {
    productIdToDelete = null;
    modalConfirmDelete.style.display = "none";
  }
});
