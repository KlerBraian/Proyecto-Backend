const { productModel } = require("../models/productsModel")


class ProductManagerMongo {
    constructor() {
        this.model = productModel
    }
    // Función para obtener productos con filtrado, ordenamiento y paginación
    getProducts = async (filter = {}, limit = 10, page = 1, sort = 'asc') => {
        // Ajustar los parámetros de paginación
        const skip = (page - 1) * limit;
        const sortOrder = sort === 'desc' ? -1 : 1;

        // Obtener productos con filtrado, ordenamiento y paginación
        const products = await this.model
            .find(filter)
            .sort({ price: sortOrder }) // Ordenar por precio
            .skip(skip) // Saltar los productos anteriores
            .limit(limit) // Limitar la cantidad de productos por página
            .lean();

        // Obtener el total de productos para calcular las páginas
        const totalProducts = await this.model.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / limit);

        return {
            payload: products,
            totalPages,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages
        };
    };

    getProduct = async opts => await this.model.findOne({ _id: opts }).lean()
    createProduct = async newProduct => await this.model.create(newProduct)
    deleteProduct = async opts => await this.model.deleteOne(opts)
    updateProduct = async (opts, element) => await this.model.findById(opts, element)
}

module.exports = {
    ProductManagerMongo
}