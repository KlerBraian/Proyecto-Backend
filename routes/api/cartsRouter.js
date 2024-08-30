                        //CONFIGURACION DE RUTAS DEL CARRITO

                        
//LLAMADO DE ARCHIVOS, METODOS Y FUNCIONES A UTILIZAR
const { Router } = require('express');
const CartManager = require('../../daos/FyleSistem/cartsManager');
const { CartManagerMongo } = require('../../Mongo/cartsDao.mongo');
const routerCart = Router()
const cartService = new CartManager();
const { getCart, createCart, getCartById, createProductToCart } = cartService;
const cartServiceMongo = new CartManagerMongo()
//CONFIGURACION DEL GET PARA OBTENER TODOS LOS CARRITOS

routerCart.get('/', async (req, res) => {
    try {
        const cartDb = await cartServiceMongo.getCarts()
        res.send({ status: "success", data: cartDb })
    } catch (error) {
        console.log(error)
    }
})



//CONFIGURACION DEL GET PARA OBTENER UN CARRITO POR ID

routerCart.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const cartDb = await cartServiceMongo.getCart({_id: cid})
        console.log(cartDb)
        res.send({ status: "success", data: cartDb })
    } catch (error) {
        console.log(error)
    }
})



//CONFIGURACION DEL POST PARA CREAR UN CARRITO

routerCart.post("/", async (req, res) => {
    try {
        const { body } = req
        const response = await cartServiceMongo.createCart(body);
        res.send({ status: "success", data: response })
    }
    catch (error) {
        console.log(error)
    }
})



//CONFIGURACION DEL POST POR CARRITO Y PRODUCTO CON SU ID

routerCart.put("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body
        const cart = await cartServiceMongo.getCart({_id: cid});
        console.log(cart)
        console.log(pid)
        let productExists = false;
        for (let i = 0; i < cart.products.length; i++) {
            console.log(cart.products[i].product.toString())
            if (cart.products[i].product === pid) {
                cart.products[i].quantity += quantity;
                productExists = true;
                break;
            }
        }
        if (!productExists) {
            cart.products.push({product : pid, quantity: quantity });
        }
        console.log(cart)
        const nCart = cart
        const response = await cartServiceMongo.updateProductCart({_id: cid, nCart});
        res.send({ status: "success", data: response })
    }
    catch (error) {
        console.log(error)
    }
})

routerCart.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const producto = await cartServiceMongo.deleteCart({_id: pid})
        res.send(producto)
    } catch (error) {
        console.log(error)
    }
})



module.exports = routerCart