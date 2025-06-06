const fs = require("fs");
const path = "./db/carts.json"
const ProductManager = require('./productManager');

const productService = new ProductManager();
const { getProductos } = productService;


class CartManager {
    constructor() {
        this.path = path
    }




    //funcion para leer y obtener los carritos con productos del archivo carts.json

    getCart = async () => {
        try {
            (fs.existsSync(path))
            const result = await fs.promises.readFile(this.path, "utf-8");
            const cart = JSON.parse(result);
            return cart;
        } catch (error) {
            return [];
        }
    }



    //funcion para crear un carrito con ID

    createCart = async (nuevoCarrito) => {
        try {
            const cart = await this.getCart();
            let newId;
            if (cart.length === 0) {
                newId = 1
            } else {
                newId = cart[cart.length - 1].idCart + 1

            }
            const productos = getProductos();
            const carrito = {};
            if (productos.id === nuevoCarrito.prodId) {
                carrito.idCart = newId;
                carrito.products = nuevoCarrito
            }
            cart.push(carrito);
            await fs.promises.writeFile(this.path, JSON.stringify(cart, null, 2), 'utf-8');
            return cart;
        } catch (error) {
            console.log(error);
        }
    }



    //funcion para obtener el carrito a traves de su ID

    getCartById = async (id_cart) => {
        try {
            const carts = await this.getCart();
            let cartId = carts.find(cart => Number(cart.idCart) === Number(id_cart));
            if (!cartId) {
                console.log("No existe el carrito");
                return `Carrito con id:${id_cart} no existe`;
            }
            return cartId;
        } catch (error) {
            console.log(error)
            return null
        }
    }



    //funcion para agregar un producto a un carrito existente obteniendo el carrito por id y el producto por parametro y modificando el archivo de carts.json

    createProductToCart = async (id_carrito, id_producto, nProduct) => {
        try {
            const carts = await this.getCart();
            const cart = await this.getCartById(id_carrito);
            let productExists = false;
            for (let i = 0; i < cart.products.length; i++) {
                if (cart.products[i].prodId === Number(id_producto)) {
                    cart.products[i].quant += nProduct;
                    productExists = true;
                    break;
                }
            }
            if (!productExists) {
                cart.products.push({ prodId: Number(id_producto), quant: nProduct });
            }
            carts[id_carrito - 1] = cart;
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
            return carts;
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = CartManager;