const { productService } = require("../services");
const { logger } = require("../utils/logger");

class ProductController {
    constructor() {
        this.service = productService
    }


    getProducts = async (req, res) => {
        try {
            const products = await this.service.getProducts()
            res.send({
                status: 'success',
                payload: products
            })
        } catch (error) {
            logger.error(error);
            res.status(500).send({
                status: "error",
                message: "Hubo un error al obtener los productos"

            });
        }
    }

    getProduct = async (req, res) => {
        try {
            const { pid } = req.params
            const producto = await this.service.getProduct(pid)
            return res.send({ status: "success", producto })
        } catch (error) {
            logger.error(error)
        }
    }



    createProduct = async (req, res) => {
        try {
            const { body } = req
            const response = await this.service.createProduct(body);
            res.send({ status: "success", data: response });
        } catch (error) {
            logger.error(error);
        }
    }

    updateProduct = async (req, res) => {
        try {
            const { pid } = req.params
            const { body } = req;
            const response = await this.service.updateProduct({ _id: pid }, body)
            res.send(response)
        } catch (error) {
            logger.error(error)
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const { pid } = req.params
            const producto = await this.service.deleteProduct({ _id: pid })
            res.send(producto)
        } catch (error) {
            logger.error(error)
        }
    }

}


module.exports = {
    ProductController
}