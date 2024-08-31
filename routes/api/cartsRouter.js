                        //CONFIGURACION DE RUTAS DEL CARRITO

                        
//LLAMADO DE ARCHIVOS, METODOS Y FUNCIONES A UTILIZAR
const { Router, json } = require('express');
const CartManager = require('../../daos/FyleSistem/cartsManager');
const { CartManagerMongo } = require('../../Mongo/cartsDao.mongo');
const routerCart = Router()
const cartService = new CartManager();
const { getCart, createCart, getCartById, createProductToCart } = cartService;
const cartServiceMongo = new CartManagerMongo()
//CONFIGURACION DEL GET PARA OBTENER TODOS LOS CARRITOS

routerCart.get('/', async (req, res) => {
    try {
        const cartsDb = await cartServiceMongo.getCarts()
        console.log(JSON.stringify(cartsDb, null, 2))
        res.send({ status: "success", payload: cartsDb })
    } catch (error) {
        console.log(error)
    }
})



//CONFIGURACION DEL GET PARA OBTENER UN CARRITO POR ID

routerCart.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const cartDb = await cartServiceMongo.getCart(cid)
        res.send({ status: "success", payload: cartDb })
    } catch (error) {
        console.log(error)
    }
})



//CONFIGURACION DEL POST PARA CREAR UN CARRITO

routerCart.post("/", async (req, res) => {
    try {
        const {body} = req
        const newCart = {
            products: body || []
        };
        const response = await cartServiceMongo.createCart(newCart);
        console.log(body)
        res.send({ status: "success", data: response })
    }
    catch (error) {
        console.log(error)
    }
})



//CONFIGURACION DEL POST POR CARRITO Y PRODUCTO CON SU ID

routerCart.put ("/:cid", async(req,res) => {
try{
    const {cid} = req.params;
    const {body} = req
    const carritoModificado = await cartServiceMongo.updateCart(cid, body)
    res.send({status: "success", carritoModificado})

}  catch (error) {
    console.log(error)
}
})


routerCart.put("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body
        const response = await cartServiceMongo.updateProductCart(cid, pid, quantity);
        res.send({ status: "success", data: response })
    }
    catch (error) {
        console.log(error)
    }
})

routerCart.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const carritoEliminado = await cartServiceMongo.deleteCart(cid)
        res.send(carritoEliminado)
    } catch (error) {
        console.log(error)
    }
})

routerCart.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const productoEliminado = await cartServiceMongo.deleteProduct(cid, pid)
        console.log(productoEliminado)
        res.send({status: "success", productoEliminado})
    } catch (error) {
        console.log(error)
    }
})


module.exports = routerCart