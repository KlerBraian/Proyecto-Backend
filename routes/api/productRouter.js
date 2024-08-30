                        //CONFIGURACION DE RUTAS DE PRODUCTOS


//LLAMADO DE ARCHIVOS, METODOS Y FUNCIONES A UTILIZAR
const { Router } = require('express');
const ProductManager = require('../../daos/FyleSistem/productManager');
const { ProductManagerMongo } = require('../../Mongo/productDao.mongo');

const router = Router()
const productService = new ProductManager();
const { getProductos, addProducto, getProductosById, updateProducto, deleteProducto } = productService;
const productServiceMongo = new ProductManagerMongo()

//CONFIGURACION DEL GET PARA OBTENER TODOS LOS PRODUCTOS
router.get('/', async (req, res) => {
    try {
        const productsDb = await productServiceMongo.getProducts()
        res.send({ status: "success", payload: productsDb })
    } catch (error) {
        console.log(error)
    }
})


//CONFIGURACION DEL POST PARA CREAR UN PRODUCTO

router.post("/", async (req, res) => {
    try {
        const { body } = req;
        const response = await productServiceMongo.createProduct(body);
        res.send({ status: "success", data: response });
    } catch (error) {
        console.log(error);
    }
});


//CONFIGURACION DEL GET PARA OBTENER UN PRODUCTO POR ID

router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const producto = await productServiceMongo.getProduct(pid)
        res.send(producto)
    } catch (error) {
        console.log(error)
    }
})


//CONFIGURACION DEL PUT PARA MODIFICAR UN PRODUCTO

router.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const { body } = req;
        const response = await productServiceMongo.updateProduct({_id: pid}, body)
        res.send(response)
    } catch (error) {
        console.log(error)
    }
})

//CONFIGURACION DEL DELETE PARA ELIMINAR UN PRODUCTO

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const producto = await productServiceMongo.deleteProduct({_id: pid})
        res.send(producto)
    } catch (error) {
        console.log(error)
    }
})



module.exports = router