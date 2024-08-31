//CONFIGURACION DE RUTAS DE VIEWS

//LLAMADO DE ARCHIVOS, METODOS Y FUNCIONES A UTILIZAR
const { Router } = require('express');
const { ProductManagerMongo } = require('../Mongo/productDao.mongo');
const { CartManagerMongo } = require('../Mongo/cartsDao.mongo');
const router = Router()
const productServiceMongo = new ProductManagerMongo()
const cartServiceMongo = new CartManagerMongo()
//CONFIGURACION DEL GET PARA RENDERIZAR EL VIEW HOME

router.get("/", async (req, res) => {
    try {
        const products = await productServiceMongo.getProducts()
        const cartId = await cartServiceMongo.getCart()
        res.render("home", {   products, cartiId : cartId,
            status: "success",
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener los productos");
    }
});

router.get("/products/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const product = await productServiceMongo.getProduct(pid)
        res.render("detalles", { product });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener los productos");
    }
});

router.get("/api/carts/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await cartServiceMongo.getCart(cid)
        console.log(cart.products)
        res.render("cart", { products: cart.products });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener los productos");
    }
});


//CONFIGURACION DEL GET PARA RENDERIZAR EL SOCKET REALTIMEPRODUCTS

router.get('/realtimeproducts', (req, res) => {

    res.render("realTimeProducts", {})
})

module.exports = router