const { Router } = require('express');
const CartManager = require('../daos/FyleSistem/cartsManager');


const routerCart = Router()
const cartService = new CartManager();
const { getCartByid, createCart } = cartService;

routerCart.get('/:cid', async (req, res)=>{
    try {
        const { pid } = req.params
        const cartsDb = await getCartByid(pid)
        res.send({status : "success" , data : cartsDb})
    } catch (error) {
        console.log (error)
    }
})


routerCart.post ("/" , async (req,res) => {
    try {
        const {body} = req
        const response = await createCart(body);
        res.send ({status : "success", data : response})
    }
    catch (error) {
        console.log (error)
    }
} )


routerCart.post ("/:cid/product/:pid" , async (req,res) => {
    try {
        const {cid} = req.params;
        const {pid} = req.params;
        const response = await createCart(body);
        res.send ({status : "success", data : response})
    }
    catch (error) {
        console.log (error)
    }
} )


module.exports = routerCart