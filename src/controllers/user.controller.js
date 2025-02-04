const { userService, cartService } = require("../services")
const { logger } = require("../utils/logger")

class UserController {
    constructor() {
        this.service = userService
    }

    getUsers = async (req, res) => {
        try {
            const users = await this.service.getUsers()
            res.send({
                status: 'success',
                payload: users
            })
        } catch (error) {
            logger.error(error)
        }
    }

    getUser = async (req, res) => {
        try {
            const { uid } = req.params
            const user = await this.service.getUser(uid)
            res.send({
                status: "success",
                payload: user
            })
        }
        catch (error) {
            logger.error(error)
        }
    }

    createUser = async (req, res) => {
        try {
            const { first_name, last_name, email, password } = req.body
            if (!first_name || !email || !password)
                return res.status(400).send({ status: success, message: "faltan ingresar datos" })
            const newCart = await cartService.createCart();
            const userFound = await this.service.getUser({ email });
            if (userFound)
                return res.status(401).send({
                    status: error,
                    message: "El usuario ya esta registrado"
                })

            const newUser = {

                first_name: first_name,
                last_name: last_name,
                email: email,
                password: createHash(password),
                role,
                cartId: newCart._id
            }

            let result = await this.service.createUser(newUser)
            res.send({
                status: succes,
                data: result,
                message: 'Has sido registrado correctamente'
            })

        } catch (error) {
            logger.error(error)
        }

    }

    updateUser = async (req, res) => {
        try {
            const { uid } = req.params
            const { body } = req;
            const response = await this.service.updateUser({ _id: uid }, body)
            res.send(response)
        } catch (error) {
            logger.error(error)
        }
    }

    deleteUser = async (req, res) => {
        try {
            const { uid } = req.params
            const user = await this.service.deleteUser({ _id: uid })
            res.send(user)
        } catch (error) {
            logger.error(error)
        }
    }
}

module.exports = {
    UserController
}