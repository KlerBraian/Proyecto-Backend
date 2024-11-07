//CONFIGURACION DE RUTAS DE VIEWS

//LLAMADO DE ARCHIVOS, METODOS Y FUNCIONES A UTILIZAR
const { Router } = require('express');
const { ViewsController } = require('../controllers/views.controller');

const router = Router()


//CONFIGURACION DEL GET PARA RENDERIZAR EL VIEW HOME

const {getPage, getProductDetail, getCartDetail, getTicket} = new ViewsController()



router.get("/", getPage );

router.get("/products/:pid", getProductDetail);

router.get("/api/carts/:cid", getCartDetail);

router.get("/api/carts/:cid/purchase",getTicket)

//CONFIGURACION DEL GET PARA RENDERIZAR EL SOCKET REALTIMEPRODUCTS

router.get('/realtimeproducts', (req, res) => {

    res.render("realTimeProducts", {})
})

router.get('/createProducts', (req, res) => {

    res.render("createProducts", {})
})


//CONFIGURACION DE RUTAS LOGIN Y REGISTER

router.get('/register', (req,res) => {
    res.render('register')
})

router.get('/login', (req,res) => {
    res.render('login')
})

module.exports = router