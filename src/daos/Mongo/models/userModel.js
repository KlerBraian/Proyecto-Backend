const {Schema, model} = require ("mongoose");

const userCollection = 'users'

const userSchema = new Schema({
    first_name : String,
    
    last_name: String,
   
    email: {
        type: String,
        required: true,
        unique: true
    },
    
    age: Number,
   
    password : {
        type: String,
        required: true,
    },
   
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'carts'  // Aquí estamos haciendo la referencia al modelo de carrito
    },
    role: {
        type: String,
        enum: ['user', 'user_premium', 'admin'],
        default: 'user'
    }
}
)

const userModel = model(userCollection, userSchema)

module.exports = {
    userModel
}
