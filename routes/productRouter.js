const { Router } = require('express');
const ProductManager = require('../daos/FyleSistem/productManager');


const router = Router()
const productService = new ProductManager();
const {getProductos, addProducto, getProductosById, updateProducto, deleteProducto} = productService;

router.get('/', async (req, res)=>{
    try {
        const productsDb = await getProductos()
        res.send({status : "success" , data : productsDb})
    } catch (error) {
        console.log (error)
    }
})

router.post("/", async (req, res) => {
    try {
        const  { body }  = req; 
        const response = await addProducto(body);
        res.send({ status: "success", data: response });
    } catch (error) {
        console.log(error);
    }
});


router.get('/:pid', async ( req, res ) => {
    try {
    const { pid } = req.params
    const producto = await getProductosById(pid)
    res.send(producto)
    } catch(error) {
    console.log(error)
    }
})

router.put('/:pid', async ( req, res ) => {
    try {
    const { pid } = req.params
    const  { body }  = req; 
    const response = await updateProducto(pid, body)
    res.send(response)
    } catch(error) {
    console.log(error)
    }
})

router.delete('/:pid', async ( req, res ) => {
    try {
    const { pid } = req.params
    const producto = await deleteProducto(pid)
    res.send(producto)
    } catch(error) {
    console.log(error)
    }
})



module.exports = router