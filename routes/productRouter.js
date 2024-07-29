const { Router } = require('express');
const ProductManager = require('../daos/FyleSistem/productManager');


const router = Router()
const productService = new ProductManager();
const {getProductos, addProducto} = productService;

router.get('/', async (req, res)=>{
    try {
        const productsDb = await getProductos()
        res.send({status : "success" , data : productsDb})
    } catch (error) {
        console.log (error)
    }
})

router.post ("/" , async (req,res) => {
    try {
        const {body} = req;
        const response = await addProducto(body);
        res.send ({status : "success", data : response})
    }
    catch (error) {
        console.log (error)
    }
} )


module.exports = router