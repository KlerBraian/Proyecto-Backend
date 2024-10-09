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
        let cart = await cartServiceMongo.getCarts();
        let cartId;

        if (cart.length !== 0) {
            cartId = cart[0]._id;
        } else {
            cartId = null
        }
        const { limit = 10, page = 1, query = "", sort } = req.query;
        const limitInt = parseInt(limit);
        const pageInt = parseInt(page);

        // Filtro de búsqueda (ajustar según sea necesario)
        let filter = {};
        if (query) {
            filter = { type: query }; // Filtra por el tipo de producto
        }

        // Obtener los productos desde la base de datos
        const response = await productServiceMongo.getProducts(filter, limitInt, pageInt, sort);
        const { payload: products, totalPages, prevPage, nextPage, hasPrevPage, hasNextPage } = response;

        // Renderizar la vista con los productos
        res.render("home", {
            cartId,
            products: products,
            totalPages: totalPages,
            currentPage: pageInt,
            hasPrevPage: hasPrevPage,
            hasNextPage: hasNextPage,
            prevPage: prevPage,
            nextPage: nextPage,
            limit: limitInt,
            query: query,
            sort: sort
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Hubo un error al obtener los productos");
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
        const { cid } = req.params;
        const cart = await cartServiceMongo.getCart(cid);

        // Calcular subtotales de productos
        const productsSubtotal = cart.products.map(product => ({
            ...product,
            subtotal: product.quantity * product.product.price // Calcula subtotal por producto
        }));

        // Calcular subtotal total
        const subtotalTotal = productsSubtotal.reduce((total, product) => total + product.subtotal, 0);

        // Enviar datos a la vista
        res.render("cart", { products: productsSubtotal, quantity: cart.quantity, cartId: cid, subtotalTotal });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener los productos");
    }
});



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