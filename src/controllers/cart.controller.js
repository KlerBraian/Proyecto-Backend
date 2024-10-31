const { cartService } = require("../service");
const { default: Swal } = require('sweetalert2');

class CartController {
    constructor() {
        this.cartService = cartService
    }

getCarts = async (req, res) => {
    try {
        const cartsDb = await cartService.get()
        console.log(JSON.stringify(cartsDb, null, 2))
        res.send({ status: "success", payload: cartsDb })
    } catch (error) {
        console.log(error)
    }
}

getCart = async (req, res) => {
    try {
        const { cid } = req.params
        const cartDb = await cartService.getBy(cid)
        res.send({ status: "success", payload: cartDb, cartId: cid })
    } catch (error) {
        console.log(error)
    }
}

createCart =  async (req, res) => {
    try {
        const { product, quantity } = req.body; // Asegúrate de que `quantity` sea un número

        let cart;
        const carts = await cartService.get();

        if (carts.length === 0) {
            // Crear un nuevo carrito con el producto
            cart = await cartService.create({ products: [{ product, quantity: parseInt(quantity) }] });
        } else {
            // Usar el primer carrito existente
            cart = carts[0];
            // Actualizar el carrito con el producto
            cart = await cartService.updateProductCart(cart._id, product, parseInt(quantity));
        }
        res.redirect("/",)
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al manejar el carrito");
    }
}

updateCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const { body } = req
        const carritoModificado = await cartService.update(cid, body)
        res.send({ status: "success", carritoModificado, })

    } catch (error) {
        console.log(error)
    }
}

updateProductCart =  async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body
        const response = await cartService.updateProductCart(cid, pid, quantity);
        res.send({ status: "success", data: response })
    }
    catch (error) {
        console.log(error)
    }
}

deleteCart =  async (req, res) => {
    try {
        const { cid } = req.params
        const carritoEliminado = await cartService.delete(cid)
        res.send(carritoEliminado)
    } catch (error) {
        console.log(error)
    }
}
 

deleteProductCart = async (req, res) => {
    try {
        const { cid, pid } = req.params
        const productoEliminado = await cartService.deleteProductCart(cid, pid)
        console.log(productoEliminado)
        res.send({ status: "success", productoEliminado })
    } catch (error) {
        console.log(error)
    }
}

}

module.exports = {
    CartController
}