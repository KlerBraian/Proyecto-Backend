const { TicketModel } = require("../Mongo/models/ticketModel")


class TicketDaoMongo {
    constructor() {
        this.model = TicketModel
    }
    // Función para obtener productos con filtrado, ordenamiento y paginación
    get = async () => {
    };
    
    
    // getBy = 
    // create = 
    // delete = 
    // update = 
}

module.exports = {
    TicketDaoMongo
}