const { cartModel } = require("../Mongo/models/cartsModel")


class CartDaoMongo {
    constructor() {
        this.model = cartModel
    }
    get = async () => await this.model.find({}).lean()
    getBy = async opts => await this.model.findOne({ _id: opts }).lean()
    create = async newCart => await this.model.create(newCart)
    delete = async opts => await this.model.findByIdAndUpdate({ _id: opts }, { $set: { products: [] } }, { new: true }).lean();
    deleteProductCart = async (opts, pid) => await this.model.updateOne({ _id: opts }, { $pull: { products: { product: pid } } });


    update = async (opts, nProducts) => await this.model.findByIdAndUpdate({ _id: opts }, { $set: { products: nProducts.products } }, { new: true });


    updateProductCart = async (cartId, productId, quantity, setQuantity = false) => {

        const cart = await this.model.findOne({ _id: cartId, "products.product": productId });

        if (cart) {
            const updateOperation = setQuantity 
            ? { $set: { "products.$.quantity": quantity } }  // Establecer cantidad específica
            : { $inc: { "products.$.quantity": quantity } };
            return await this.model.updateOne(
                { _id: cartId, "products.product": productId },
                updateOperation,
                { new: true }
            );
        } else {

            return await this.model.updateOne(
                { _id: cartId },
                { $push: { products: { product: productId, quantity: quantity } } },
                { new: true }
            );
        }
    }
}
module.exports = {
    CartDaoMongo
}