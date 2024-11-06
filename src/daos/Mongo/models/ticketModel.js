const { Schema, model } = require('mongoose')

const collections = 'ticket'

const TicketSchema = new Schema({

    code: String,
   
    purchase_datatime: {
       Date
    },
    
    age: Number,
   
    password : {
        type: String,
        required: true,
    },
   
    amount: Number,
    
    purhcaser: String
})

TicketSchema.pre(['find', 'findOne'], function () {
    this.populate('amount.product');
});


const TicketModel = model(collections, TicketSchema)

module.exports = {
    TicketModel
}