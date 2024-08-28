const { productModel } = require("../models/productsModel")


class ProductManagerMongo  {
    constructor (){
        this.model = productModel
    }
    getProducts   = async () => await this.model.find({}).lean()
    getProduct    = async opts => await this.model.findOne(opts).lean()
    createProduct = async newProduct => await this.model.create(newProduct)
    deleteProduct = async opts => await this.model.deleteOne(opts)
    updateProduct = async opts => await this.model.updateOne(opts, element)
}

module.exports = {
    ProductManagerMongo
}