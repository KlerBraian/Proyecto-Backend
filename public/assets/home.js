let listContainer = document.querySelector("#list-container")

fetch('/db/product.json')
  .then(response => response.json())
  .then(data => data.forEach(producto => {

    let div = document.createElement('div');
    div.classList.add('producto');
    div.innerHTML = `
    <div class="productos-grilla">
        <h3 class="producto-title">${producto.title}</h3>
        <p class="producto-price">$${producto.price}</p>
        <p class="producto-categoria">Categoria: ${producto.category}</p>
        <p class="producto-description">${producto.description}</p>
        <p class="producto-stock">Unidades disponibles: ${producto.stock}</p>
        <button class="boton-agregar" id ="${producto.id}">Agregar al carrito</button>
    </div>
    `;
    listContainer.append(div);
}))
