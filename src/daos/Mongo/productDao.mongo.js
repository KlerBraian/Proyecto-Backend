const { productModel } = require("../Mongo/models/productsModel")


class ProductDaoMongo {
    constructor() {
        this.model = productModel
    }
    // Función para obtener productos con filtrado, ordenamiento y paginación
    get = async (filter = {}, limit = 10, page = 1, sort = 'asc') => {
        const skip = (page - 1) * limit;
        const sortOrder = sort === 'desc' ? -1 : 1;
    
        // Obtener productos con filtrado, ordenamiento y paginación
        const products = await this.model
            .find(filter)
            .sort({ price: sortOrder })
            .skip(skip)  // Paginación: saltar productos
            .limit(limit)  // Limitar la cantidad de productos
            .lean();
    
        // Obtener el total de productos
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
    
    
    getBy = async opts => await this.model.findOne({ _id: opts }).lean()
    create = async newProduct => await this.model.create(newProduct)
    delete = async opts => await this.model.deleteOne(opts)
    update = async (opts, element) => await this.model.findByIdAndUpdate(opts, element)
}

module.exports = {
    ProductDaoMongo
}