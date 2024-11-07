const { userService } = require("../services")

class UserController {
 constructor () {
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
        console.log(error)
    }
}

getUser = async (req, res) => {
    const { id } = req.params
    const user = await this.service.getUser(id)
    res.send({status: "success",
              payload: user})
}

createUser =  async (req, res) => {
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
}

updateUser =  async (req, res) => {
    try {
        const { uid } = req.params
        const { body } = req;
        const response = await this.service.updateUser({ _id: uid }, body)
        res.send(response)
    } catch (error) {
        console.log(error)
    }
}

deleteUser =  async (req, res) => {
    try {
        const { uid } = req.params
        const user = await this.service.deleteUser({ _id: uid })
        res.send(user)
    } catch (error) {
        console.log(error)
    }
}
}

module.exports = {
    UserController
}