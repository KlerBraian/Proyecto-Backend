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
        // if (
        //     !producto.title ||			
        //     !producto.description||
        //     !producto.price ||
        //     !producto.code
        //   ) {
        //     return console.error("producto incompleto");
        //   }

        const productos = await this.getProductos();
        if (productos.length === 0) {
            nuevoProducto.id = 1
        } else {
            nuevoProducto.id = productos[productos.length - 1].id + 1
        }
        productos.push(nuevoProducto);
        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2), 'utf-8');
    }

    getProductosById = async(id_producto) => {
        try {
            const productos = await this.getProductos()
            let producto = productos.find(producto => producto.id === id_producto)
            if (!producto) {
                console.log("No existe el producto")
            }
            return producto;
        } catch (error) {
            console.log(error)
            return null
        }
    }

    updateProducto = async(id_producto, nProducto) => {
        try {
            const productos = await this.getProductos()
            let producto = productos.findIndex(producto => producto.id === id_producto)
            let productoModificado = { ...productos[producto], ...nProducto };


            productos[producto] = productoModificado;
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2), 'utf8');
        } catch (error) {
            console.log("No se pudo modificar el producto")
        }

    }

    deleteProducto = async(id_producto) => {
        try {
            const productos = await this.getProductos()
            let indexProductoAEliminar = productos.findIndex(producto => producto.id === id_producto)
            productos.splice(indexProductoAEliminar, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2), 'utf8');
            return `Producto con ID ${id_producto} eliminado`;

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
