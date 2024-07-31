const fs = require("fs");
const path = "./db/product.json";

class ProductManager {
    constructor() {
        this.path = path;
    }
    
    
    getProductos = async () => {
        try{(fs.existsSync(path))
                const result = await fs.promises.readFile(this.path, "utf-8");
                const productos = JSON.parse(result);
                return productos;
            } catch (error) {
                return [];     
    }
}

    addProducto = async nuevoProducto => {
        if (
            !nuevoProducto.title ||			
            !nuevoProducto.description||
            !nuevoProducto.price ||
            !nuevoProducto.code ||
            !nuevoProducto.stock ||
            !nuevoProducto.category
          ) {
            console.log("Producto incompleto")
            return "Producto incompleto";
          }

        try {
            const productos = await this.getProductos();
            if (productos.length === 0) {
                nuevoProducto.id = 1;
                nuevoProducto.status = true
            } else {
                nuevoProducto.id = productos[productos.length - 1].id + 1;
                nuevoProducto.status = true
            }
            productos.push(nuevoProducto);
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2), 'utf-8');
        } catch (error) {
            console.log(error);
        }
    }

    getProductosById = async(id_producto) => {
        try {
            const productos = await this.getProductos()
            let producto = productos.find(producto => Number(producto.id) === Number(id_producto));
            if (!producto) {
                console.log("No existe el producto");
                return "No existe el producto"
            }
            return producto;
        } catch (error) {
            console.log(error)
            return null
        }
    }

    updateProducto = async(id_producto, nProducto) => {
        try {
            const productos = await this.getProductos();
            let producto = productos.findIndex(producto => Number(producto.id) === Number(id_producto));
            let productoAModificar = productos.find(producto => Number(producto.id) === Number(id_producto));
            let productoModificado = { ...productos[producto], ...nProducto , id: productoAModificar.id };
            productos[producto] = productoModificado;
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2), 'utf8');
            console.log(`Producto con ID ${id_producto} modificado: ${JSON.stringify(productoAModificar)} 
            Nuevo producto: ${JSON.stringify(productoModificado)}. Recuerda que el id siempre sera el mismo`)
            return `Producto con ID ${id_producto} modificado: ${JSON.stringify(productoAModificar)} 
            Nuevo producto: ${JSON.stringify(productoModificado)}. Recuerda que el id siempre sera el mismo`
        } catch (error) {
            console.log("No se pudo modificar el producto")
        }

    }

    deleteProducto = async(id_producto) => {
        try {
            const productos = await this.getProductos()
            let indexProductoAEliminar = productos.findIndex(producto => Number(producto.id) === Number(id_producto));
            let productoEliminado = productos.find(producto => Number(producto.id) === Number(id_producto));
            productos.splice(indexProductoAEliminar, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2), 'utf8');
            return `Producto con ID ${id_producto} eliminado: ` + JSON.stringify(productoEliminado);

        } catch (error) {
            console.log("No se pudo eliminar el producto")
        }
    }

 }

module.exports = ProductManager;

// const test = async () => {
//   const productManager = new ProductManager('./productos.json');
//   await productManager.addProducto({
//       title: 'Auto',
//       description :"clio 2009",
//       price : 400,
//       thumbnail: "imagen",
//       stock: 2,
//       code : 456,
//   });

//   await productManager.addProducto({
//     title: 'Ausafddsfsto',
//     description :"asdfasdfasd 2009",
//     price : 4500,
//     thumbnail: "imaasdfasdfsgen",
//     stock: 22,
//     code : 4456,
// });

// await productManager.addProducto({
//   title: 'hhghhhto',
//   description :"dfhhd 2009",
//   price : 45500,
//   thumbnail: "imahn",
//   stock: 212,
//   code : 41456,
// });
//   const productos = await productManager.getProductos();
//   console.log(productos);


//   const getProductosID = await productManager.getProductosById(2)
//   console.log(getProductosID);

//   const modificarProd = await productManager.updateProducto(1, {
//     title : "camioneta",
//     price : 5000,
//     stock : 3,
//     code : 40
//   })
//   console.log (modificarProd);

//   const productoAEliminado = await productManager.deleteProducto(0)
//   console.log(productoAEliminado);

//   const nuevaLista = await productManager.getProductos();
//   console.log(nuevaLista)
// }
