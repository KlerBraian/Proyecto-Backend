const { CartDaoMongo } = require("../daos/Mongo/cartsDao.mongo");
const { ProductDaoMongo } = require("../daos/Mongo/productDao.mongo");
const UserDaoMongo = require("../daos/Mongo/userDao.mongo");

const cartService = new CartDaoMongo();
const productService = new ProductDaoMongo();
const userService = new UserDaoMongo();


module.exports = {
    userService,
    productService,
    cartService
}