//CONFIGURACION DE RUTAS DEL CARRITO


//LLAMADO DE ARCHIVOS, METODOS Y FUNCIONES A UTILIZAR
const { Router, json } = require('express');
const { CartController } = require('../../controllers/cart.controller');
const passport = require('passport');

const routerCart = Router()

const { getCarts, getCart, createCart, updateCart ,updateProductCart, deleteCart, deleteProductCart, purchaseCart } = new CartController();

//CONFIGURACION DEL GET PARA OBTENER TODOS LOS CARRITOS

routerCart.get('/', getCarts)



//CONFIGURACION DEL GET PARA OBTENER UN CARRITO POR ID

routerCart.get('/:cid', getCart)



//CONFIGURACION DEL POST PARA CREAR UN CARRITO
routerCart.post("/" ,createCart);


routerCart.post("/:cid/purchase", purchaseCart);

//CONFIGURACION DEL POST POR CARRITO Y PRODUCTO CON SU ID

routerCart.put("/:cid",updateCart )


routerCart.put("/:cid/product/:pid",updateProductCart)

routerCart.delete('/:cid', deleteCart)

routerCart.delete('/:cid/product/:pid', deleteProductCart)


module.exports = routerCart