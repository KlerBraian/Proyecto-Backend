                        //CONFIGURACION DE RUTAS DE VIEWS

//LLAMADO DE ARCHIVOS, METODOS Y FUNCIONES A UTILIZAR
const { Router } = require('express');
const ProductManager = require('../daos/FyleSistem/productManager');
const router = Router()


//CONFIGURACION DEL GET PARA RENDERIZAR EL VIEW HOME

router.get("/", async (req, res) => {
        const {getProductos} = new ProductManager;
        const products = await getProductos()
            res.render("home",{products})
    
})

//CONFIGURACION DEL GET PARA RENDERIZAR EL SOCKET REALTIMEPRODUCTS

router.get('/realtimeproducts', (req, res) => {

    res.render("realTimeProducts",{})
})

module.exports = router