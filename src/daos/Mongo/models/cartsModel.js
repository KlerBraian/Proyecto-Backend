const { Schema, model } = require('mongoose')

const cartCollections = 'carts'

const CartSchema = new Schema({
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: {
                type: Number
            }
        }]
    }
})

CartSchema.pre(['find', 'findOne'], function () {
    this.populate('products.product');
});


const cartModel = model(cartCollections, CartSchema)

module.exports = {
    cartModel
}