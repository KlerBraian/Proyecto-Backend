class CartRepository {
    constructor(dao) {
        this.dao = dao
    }

    getCarts = async () => await this.dao.get()
    getCart = async opts => await this.dao.getBy(opts)
    createCart = async newCart => await this.dao.create(newCart) 
    updateCart = async (opts, nProducts) => await this.dao.update (opts, nProducts) 
    deleteCart = async opts => await this.dao.delete (opts)
    updateProductCart = async (cartId, productId, quantity) => await this.dao.updateProductCart(cartId, productId, quantity)
    deleteProductCart = async (opts, pid) => await this.dao.deleteProductCart(opts, pid)
}

module.exports = CartRepository