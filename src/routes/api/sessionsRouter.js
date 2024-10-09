const { Router } = require('express')
const userDaoMongo = require('../../Mongo/userDao.mongo')
const { createHash, isValidPassword } = require('../../utils/validatePassword')
const { generateToken } = require('../../utils/jwt')



const router = Router();
const userService = new userDaoMongo()


router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password } = req.body
    if (!first_name || !email || !password)
        return res.status(400).send({ status: success, message: "faltan ingresar datos" })
    
    const userFound = await userService.getUser({ email });
    if (userFound)
        return res.status(401).send({
            status: "error",
            message: "El usuario ya esta registrado"
        })
        

    const newUser = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: createHash(password)
    }
    let result = await userService.createUser(newUser)
    res.send({
        status: "success",
        data: result,
        message: 'Has sido registrado correctamente'
    })
})

router.post('/login',async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) 
        return res.status(400).send({
    status: success,
    message:"Faltan ingresar campos"
})
    const userFound = await userService.getUser({email})
    if(!userFound)
        return res.status(401).send(
    {status: "error",
    message: "Usuario no encontrado"
    })

    if(!isValidPassword(password,userFound.password))res.send({status:error, message:"los datos son incorrectos"})
    const token = generateToken({
        id: userFound._id,
        email: userFound.email,
        role: userFound.role === 'admin'

    })
    res.send({
        status: 'success',
        message: 'logueado correctamente',
        token
    })

})

router.get('/current', (req, res) => {
        res.send('datos sensibles')
})

router.post('/logout', (req, res) => {
    res.send("logout")
})

module.exports = router