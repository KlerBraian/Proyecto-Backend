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
        const cart = await cartServiceMongo.createCart({ products: [] })

        const { limit = 10, page = 1, query = "", sort } = req.query;
        const limitInt = parseInt(limit);
        const pageInt = parseInt(page);
        let filter = {};

        if (query) {
            filter = { ...filter, type: query };  
        }

        let productsDb = await productServiceMongo.getProducts(filter);


        if (sort === "asc") {
            productsDb = productsDb.sort((a, b) => a.price - b.price);
        } else if (sort === "desc") {
            productsDb = productsDb.sort((a, b) => b.price - a.price);
        }

        const totalProducts = productsDb.length;
        const totalPages = Math.ceil(totalProducts / limitInt);
        const startIndex = (pageInt - 1) * limitInt;
        const endIndex = pageInt * limitInt;
        const paginatedProducts = productsDb.slice(startIndex, endIndex);

        const hasPrevPage = pageInt > 1;
        const hasNextPage = pageInt < totalPages;
        const prevPage = hasPrevPage ? pageInt - 1 : null;
        const nextPage = hasNextPage ? pageInt + 1 : null;

        const prevLink = hasPrevPage ? `/products?limit=${limitInt}&page=${prevPage}&query=${query}&sort=${sort}` : null;
        const nextLink = hasNextPage ? `/products?limit=${limitInt}&page=${nextPage}&query=${query}&sort=${sort}` : null;

        res.render("home", {
            products,
            cartId: cart._id,
            status: "success",
            payload: paginatedProducts,
            totalPages: totalPages,
            prevPage: prevPage,
            nextPage: nextPage,
            page: pageInt,
            hasPrevPage: hasPrevPage,
            hasNextPage: hasNextPage,
            prevLink: prevLink,
            nextLink: nextLink
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

router.get("/carts/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await cartServiceMongo.getCart(cid)
        console.log(cart)
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