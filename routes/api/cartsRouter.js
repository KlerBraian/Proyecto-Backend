                        //CONFIGURACION DE RUTAS DEL CARRITO

                        
//LLAMADO DE ARCHIVOS, METODOS Y FUNCIONES A UTILIZAR
const { Router } = require('express');
const CartManager = require('../../daos/FyleSistem/cartsManager');
const routerCart = Router()
const cartService = new CartManager();
const { getCart, createCart, getCartById, createProductToCart } = cartService;

//CONFIGURACION DEL GET PARA OBTENER TODOS LOS CARRITOS

routerCart.get('/', async (req, res) => {
    try {
        const cartDb = await getCart()
        res.send({ status: "success", data: cartDb })
    } catch (error) {
        console.log(error)
    }
})



//CONFIGURACION DEL GET PARA OBTENER UN CARRITO POR ID

routerCart.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const cartsDb = await getCartById(cid)
        res.send({ status: "success", data: cartsDb })
    } catch (error) {
        console.log(error)
    }
})



//CONFIGURACION DEL POST PARA CREAR UN CARRITO

routerCart.post("/", async (req, res) => {
    try {
        const { body } = req
        const response = await createCart(body);
        res.send({ status: "success", data: response })
    }
    catch (error) {
        console.log(error)
    }
})



//CONFIGURACION DEL POST POR CARRITO Y PRODUCTO CON SU ID

routerCart.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid } = req.params;
        const { pid } = req.params;
        const { body } = req
        const response = await createProductToCart(cid, pid, body.quant);
        res.send({ status: "success", data: response })
    }
    catch (error) {
        console.log(error)
    }
})


module.exports = routerCart