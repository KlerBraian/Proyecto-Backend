const { cartModel } = require("../models/cartsModel")


class CartManagerMongo  {
    constructor (){
        this.model = cartModel
    }
    getCarts   = async () => await this.model.find({}).lean()
    getCart    = async opts => await this.model.findOne(opts).lean()
    createCart = async newCart => await this.model.create(newCart)
    deleteCart = async opts => await this.model.deleteOne(opts)
    updateProductCart = async (opts,cart) => await this.model.findByIdAndUpdate(opts, cart, { new: true }).lean()
}

module.exports = {
    CartManagerMongo
}