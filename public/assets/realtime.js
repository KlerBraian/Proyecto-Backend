const socket = io();

let listContainer = document.querySelector("#list-container");
let inputTitle = document.querySelector("#title");
let inputPrice = document.querySelector("#price");
let inputCode = document.querySelector("#code");
let inputDescription = document.querySelector("#description");
let inputStock = document.querySelector("#stock");
let inputCategoria = document.querySelector("#category");
let button = document.querySelector("#submit");
let inputs = document.querySelectorAll(".productbox");


// Obtener productos iniciales
fetch('/db/product.json')
    .then(response => response.json())
    .then(data => socket.emit("productosBD", data));

// Función para agregar un producto
function agregarProducto() {
    if (
        !inputTitle.value ||			
        !inputPrice.value||
        !inputCode.value ||
        !inputDescription.value ||
        !inputStock.value ||
        !inputCategoria.value
      ) {
        Swal.fire("Debe rellenar todos los campos")
        return
      }

    const producto = {
        title: inputTitle.value,
        price: inputPrice.value,
        code: inputCode.value,
        description: inputDescription.value,
        stock: inputStock.value,
        category: inputCategoria.value
    };
    limpiarInputs();
    socket.emit("productoNuevo", producto);
}

function limpiarInputs() {
    inputs.forEach(input => {
        input.value = '';
    });
}

// Manejar el clic en el botón para agregar el producto
button.addEventListener("click", (event) => {
    event.preventDefault(); // Evitar el envío del formulario
    agregarProducto();
});


// Manejar la recepción de productos
socket.on("productosCargados", (data) => {
    listContainer.innerHTML = ''; // Limpiar el contenedor
    data.forEach(producto => {
        let div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
        <div class="detalle-productos">
            <h3 class="producto-title">${producto.title}</h3>
            <p class="producto-price">$${producto.price}</p>
            <p class="producto-categoria">${producto.category}</p>
            <p class="producto-description">${producto.description}</p>
            <p class="producto-stock">${producto.stock}</p>
            <button class="boton-agregar" id="${producto.id}">Agregar al carrito</button>
        </div>
        `;
        listContainer.append(div);
    });
});


// Manejar la recepción de nuevos productos
socket.on("nuevoProductoCargado", (data) => {
    listContainer.innerHTML = ''; // Limpiar el contenedor
    data.forEach(producto => {
        let div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
        <div class="productos-grilla">
            <h3 class="producto-title">${producto.title}</h3>
            <p class="producto-price">$${producto.price}</p>
            <p class="producto-categoria">${producto.category}</p>
            <p class="producto-description">${producto.description}</p>
            <p class="producto-stock">${producto.stock}</p>
            <button class="boton-agregar" id="${producto.id}">Agregar al carrito</button>
        </div>
        `;
        listContainer.append(div);
    });
});
