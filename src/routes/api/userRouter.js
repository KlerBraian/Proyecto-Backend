const { Router } = require('express')
const UserDaoMongo = require('../../Mongo/userDao.mongo')

const router = Router()
const userService = new UserDaoMongo()
router.get('/',async (req, res)=>{
        try {
            const users = await userService.getUsers()
            
            res.send({
                status: 'success',
                payload: users
            })
        } catch (error) {
            console.log(error)
        }
    })

    router.get('/:uid', async (req, res)=>{
        res.send('users')
    })

    router.post('/', async (req, res)=>{
        const { first_name, last_name, email, password } = req.body
        if (!first_name || !email || !password)
            return res.status(400).send({ status: success, message: "faltan ingresar datos" })
        
        const userFound = await userService.getUser({ email });
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

        let result = await userService.createUser(newUser)
        res.send({
            status: succes,
            data: result,
            message: 'Has sido registrado correctamente'
        })
    })

    router.put('/:uid', async (req, res)=>{
        res.send('users')
    })

    router.delete('/:uid', async (req, res)=>{
        res.send('users')
    })

module.exports = router