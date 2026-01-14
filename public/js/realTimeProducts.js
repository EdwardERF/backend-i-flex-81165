const socket = io();

const list = document.getElementById("products");
const form = document.getElementById("productForm");

socket.on("productsList", (products)=> {
  list.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.dataset.productId = product.id;
    
    card.innerHTML = `
      <div class="product-thumbnail">
        ${
          product.thumbnail
            ? `<img src="${product.thumbnail}" alt="${product.title}" />`
            : `<span>Sin imagen</span>`
        }
      </div>

      <div class="product-body">
        <h3>${product.title}</h3>
        <p><strong>$${product.price}</strong></p>
        <p>${product.description ?? ""}</p>

        <div class="product-meta">
          Stock: ${product.stock ?? "-"} · Categoría: ${product.category ?? "-"}
        </div>
      </div>

      <div class="product-actions">
        <button
          class="btn-delete"
          data-product-id="${product.id}"
        >
          Eliminar
        </button>
      </div>
    `;

    list.appendChild(card);
  });
})

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    title: form.title.value,
    price: form.price.value
  };

  socket.emit("new-product", data);
  form.reset();
});

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    const productId = e.target.dataset.productId;
    socket.emit("delete-product", productId);
  }
});