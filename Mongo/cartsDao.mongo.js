const { cartModel } = require("../models/cartsModel")


class CartManagerMongo  {
    constructor (){
        this.model = cartModel
    }
    getCarts   = async () => await this.model.find({}).lean()
    getCart    = async opts => await this.model.findOne({_id : opts}).lean()
    createCart = async newCart => await this.model.create(newCart)
    deleteCart = async opts => await this.model.findByIdAndUpdate({_id: opts}, { $set: { products: [] } }, { new: true }).lean();
    deleteProduct = async (opts,pid) => await this.model.updateOne({_id: opts}, {$pull: {products: {product:pid}}});
    updateCart = async (opts,nProducts) => await this.model.findByIdAndUpdate({_id : opts}, {$set: {products: nProducts.products}}, {new:true});


    updateProductCart = async (opts, pid, nCant) => await this.model.updateOne({_id: opts}, {$set: {products: {product: pid , quantity: nCant}}}, { new: true })
}

module.exports = {
    CartManagerMongo
}