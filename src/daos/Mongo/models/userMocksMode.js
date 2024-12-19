const { Schema, model } = require("mongoose");

const userCollection = 'usersMocks'

const usersMockSchema = new Schema({
    first_name: String,

    last_name: String,

    email: {
        type: String,
        required: true,
        unique: true
    },

    age: {
        type: Date
    },

    password: {
        type: String,
        required: true,
    },

    carts: {
        type: Array,
    },
    role: {
        type: String,
        enum: ['user', 'user_premium', 'admin'],
        default: 'user'
    }
}
)

const usersMockModel = model(userCollection, usersMockSchema)

module.exports = {
    usersMockModel
}
