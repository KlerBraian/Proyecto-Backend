const { userService } = require("../service")

class UserController {
 constructor () {
    this.userService = userService
 }    
 


getUsers = async (req, res) => {
    try {
        const users = await userService.get()

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
    const user = await userService.getBy(id)
    res.send('users',user)
}

createUser =  async (req, res) => {
    const { first_name, last_name, email, password } = req.body
    if (!first_name || !email || !password)
        return res.status(400).send({ status: success, message: "faltan ingresar datos" })

    const userFound = await userService.getBy({ email });
    if (userFound)
        return res.status(401).send({
            status: error,
            message: "El usuario ya esta registrado"
        })

    const newUser = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: createHash(password)
    }

    let result = await userService.create(newUser)
    res.send({
        status: succes,
        data: result,
        message: 'Has sido registrado correctamente'
    })
}

updateUser =  async (req, res) => {
    res.send('users')
}

deleteUser = async (req, res) => {
    res.send('users')
}
}

module.exports = {
    UserController
}