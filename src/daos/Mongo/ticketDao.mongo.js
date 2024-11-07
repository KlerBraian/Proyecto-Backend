const { ticketModel } = require("../Mongo/models/ticketModel")


class TicketDaoMongo {
    constructor() {
        this.model = ticketModel
    }
    // Función para obtener productos con filtrado, ordenamiento y paginación
    get = async () => await this.model.find({}).lean()
    getBy = async opts => await this.model.findOne({ _id: opts }).lean()
    create = async newTicket => await this.model.create(newTicket)
}

module.exports = {
    TicketDaoMongo
}