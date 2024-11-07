const { Schema, model } = require('mongoose')

const ticketCollection = 'ticket'

const TicketSchema = new Schema({
    code: {
        type: Number,
        unique: true,
        default: function () {
            return Math.floor(Math.random() * 1000000);  
        }
    },

    purchase_datetime: {
        type: Date,
        default: Date.now 
    },

    amount: {
        type: Number,
    },

    purchaser: {
        type: String,
    },
});


const ticketModel = model(ticketCollection, TicketSchema)

module.exports = {
    ticketModel
}