                        //CONFIGURACION DE RUTAS DE VIEWS

//LLAMADO DE ARCHIVOS, METODOS Y FUNCIONES A UTILIZAR
const { Router } = require('express');
const { ProductManagerMongo } = require('../Mongo/productDao.mongo');
const router = Router()
const productServiceMongo = new ProductManagerMongo()

//CONFIGURACION DEL GET PARA RENDERIZAR EL VIEW HOME

router.get("/", async (req, res) => {
    try {
        const products = await productServiceMongo.getProducts()
        res.render("home", { products });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener los productos");
    }
});


//CONFIGURACION DEL GET PARA RENDERIZAR EL SOCKET REALTIMEPRODUCTS

router.get('/realtimeproducts', (req, res) => {

    res.render("realTimeProducts",{})
})

module.exports = router