const { Schema, model } = require("mongoose");

const productsCollection = "products";

const productSchema = new Schema({
    title: {
        type: String, 
        required: true,
        index: true
    },
    price: {
        type: Number, 
        required: true
    },
    stock: {
        type: Number, 
        required: true
    },
    category: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    code: {
        type: String, 
        required: true,
        index: true,
        unique: true
    },
    thumbnail: {
        type: String 
    },
    create: {
        type: Date, 
        default: Date.now
    }
});

const productModel = model(productsCollection, productSchema);

module.exports = {
    productModel
};
