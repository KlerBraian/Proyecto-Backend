class ProductRepository {
    constructor(dao) {
        this.dao = dao
    }
 

getProducts = async (filter = {}, limit = 10, page = 1, sort = 'asc') => {
        return await this.dao.get(filter, limit, page, sort);
    };
getProduct = async opts => await this.dao.getBy(opts)
createProduct = async newProduct => await this.dao.create(newProduct) 
updateProduct = async (opts, elements) => await this.dao.update (opts, elements) 
deleteProduct = async opts => await this.dao.delete (opts)
}

module.exports = ProductRepository