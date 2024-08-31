const { productModel } = require("../models/productsModel")


class ProductManagerMongo  {
    constructor (){
        this.model = productModel
    }
    getProducts   = async () => await this.model.find({}).lean()
    getProduct    = async opts => await this.model.findOne({_id:opts}).lean()
    createProduct = async newProduct => await this.model.create(newProduct)
    deleteProduct = async opts => await this.model.deleteOne(opts)
    updateProduct = async (opts, element) => await this.model.findById(opts, element)
}

module.exports = {
    ProductManagerMongo
}