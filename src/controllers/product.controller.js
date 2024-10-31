const { productService } = require("../service");

class ProductController {
    constructor(){
        this.productService= productService
    }
 
 
 getProducts = async (req, res) => {

    try {

        const { limit = 10, page = 1, query = "", sort } = req.query;

        const limitInt = parseInt(limit);

        const pageInt = parseInt(page);

        // Filtro de búsqueda (a ajusta)

        let filter = {};

        if (query) {

            filter = { type: query }; // Filtra por el tipo de producto

        }

        // Obtener los productos desde la base de datos (aplicar filtro)

        let products = await productService.get(filter);

        // Ordenamiento

        if (sort === "asc") {

            products = products.sort((a, b) => a.price - b.price);

        } else if (sort === "desc") {

            products = products.sort((a, b) => b.price - a.price);

        }

        // Paginación

        const totalProducts = products.length;

        const totalPages = Math.ceil(totalProducts / limitInt);

        const startIndex = (pageInt - 1) * limitInt;

        const endIndex = pageInt * limitInt;

        const paginatedProducts = products.slice(startIndex, endIndex);

        // Determinar si hay páginas previas y siguientes

        const hasPrevPage = pageInt > 1;

        const hasNextPage = pageInt < totalPages;

        // Construir los links para la página previa y siguiente

        const prevPage = hasPrevPage ? pageInt - 1 : null;

        const nextPage = hasNextPage ? pageInt + 1 : null;

        const prevLink = hasPrevPage ? `/products?limit=${limitInt}&page=${prevPage}&query=${query}&sort=${sort}` : null;

        const nextLink = hasNextPage ? `/products?limit=${limitInt}&page=${nextPage}&query=${query}&sort=${sort}` : null;

        // Respuesta final con la estructura solicitada

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

        console.error(error);

        res.status(500).send({

            status: "error",

            message: "Hubo un error al obtener los productos"

        });

    }

}

getProduct = async (req, res) => {
    try {
        const { pid } = req.params
        const producto = await productService.getBy(pid)
        return res.send({ status: "success", producto })
    } catch (error) {
        console.log(error)
    }
}



createProduct =  async (req, res) => {
    try {
        const { body } = req
        const response = await productService.create(body);
        res.send({ status: "success", data: response });
    } catch (error) {
        console.log(error);
    }
}

updateProduct =  async (req, res) => {
    try {
        const { pid } = req.params
        const { body } = req;
        const response = await productService.update({ _id: pid }, body)
        res.send(response)
    } catch (error) {
        console.log(error)
    }
}

deleteProduct =  async (req, res) => {
    try {
        const { pid } = req.params
        const producto = await productService.delete({ _id: pid })
        res.send(producto)
    } catch (error) {
        console.log(error)
    }
}

}


module.exports = {
    ProductController
}