class TicketRepository {
    constructor(dao) {
        this.dao = dao
    }

    getTickets = async () => await this.dao.get()
    getTicket = async opts => await this.dao.getBy(opts)
    createTicket = async newTicket => await this.dao.create(newTicket) 

}

module.exports = TicketRepository