const { CartDaoMongo } = require("../daos/Mongo/cartsDao.mongo");
const { ProductDaoMongo } = require("../daos/Mongo/productDao.mongo");
const { TicketDaoMongo } = require("../daos/Mongo/ticketDao.mongo");
const { UserDaoMongo } = require("../daos/Mongo/userDao.mongo");
const CartRepository = require("../repositories/cart.repository");
const ProductRepository = require("../repositories/product.repository");
const TicketRepository = require("../repositories/ticket.repository");
const UsersRepository = require("../repositories/users.repository");

const cartService = new CartRepository (new CartDaoMongo());
const productService = new ProductRepository (new ProductDaoMongo());
const userService = new UsersRepository (new UserDaoMongo());
const viewsService = {cartService, productService}
const ticketService =  new TicketRepository(new TicketDaoMongo())

module.exports = {
    userService,
    productService,
    cartService,
    viewsService,
    ticketService
}