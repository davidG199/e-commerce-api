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
          <h2>${nombreProducto}</h2>
          <p>${descripcionProducto}</p>
          <p>$${precioProducto}</p>
          <p>${categoriaProducto}</p>
          <img src="${imagenProducto}" alt="${producto.name}";" />
    `;

  contenedorProductos.appendChild(card);
}
