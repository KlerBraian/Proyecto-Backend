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
        const { limit = 10, page = 1, query = "", sort } = req.query;
        const limitInt = parseInt(limit);
        const pageInt = parseInt(page);
        let filter = {};
        
        if (query) {
            filter = { ...filter, type: query };  // Asegúrate de que el campo 'type' exista en tu modelo de producto
        }

        let productsDb = await productServiceMongo.getProducts(filter);
        
        // Ordenar los productos si se especifica un orden
        if (sort === "asc") {
            productsDb = productsDb.sort((a, b) => a.price - b.price);
        } else if (sort === "desc") {
            productsDb = productsDb.sort((a, b) => b.price - a.price);
        }

        // Cálculo de la paginación
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

        res.send({
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
        res.status(500).send({
            status: "error",
            message: "Hubo un error al obtener los productos"
        });
    }
});

//CONFIGURACION DEL POST PARA CREAR UN PRODUCTO

router.post("/", async (req, res) => {
    try {
        const response = await productServiceMongo.createProduct({products: []});
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
       return res.send({status: "success", producto})
    } catch (error) {
        console.log(error)
    }
})


//CONFIGURACION DEL PUT PARA MODIFICAR UN PRODUCTO

router.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const { body } = req;
        const response = await productServiceMongo.updateProduct({ _id: pid }, body)
        res.send(response)
    } catch (error) {
        console.log(error)
    }
})

//CONFIGURACION DEL DELETE PARA ELIMINAR UN PRODUCTO

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const producto = await productServiceMongo.deleteProduct({ _id: pid })
        res.send(producto)
    } catch (error) {
        console.log(error)
    }
})



module.exports = router