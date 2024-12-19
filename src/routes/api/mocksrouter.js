//CONFIGURACION DE RUTAS DE PRODUCTOS


//LLAMADO DE ARCHIVOS, METODOS Y FUNCIONES A UTILIZAR
const { Router } = require('express');
const { generarUsers } = require('../../utils/mocks');
const { UsersMockDaoMongo } = require('../../daos/Mongo/userMocksDao.mongo');

const router = Router()
const usersMockDao = new UsersMockDaoMongo()

router.get('/mockingUsers', (req, res) => {
    let users = []
    for (let i = 0; i < 50; i++) {
        users.push(generarUsers())
    }
    res.send({ status: "success", data: users })
}
)

router.get('/generateData', async (req, res) => {
    let users = await usersMockDao.get()
    res.send({ status: "success", data: users })
}
)

router.post('/generateData', async (req, res) => {
    try {
        let users = []
        for (let i = 0; i < 50; i++) {
            users.push(generarUsers())
        }
        const savedUsers= await usersMockDao.create(users);
        res.status(201).send({ status: 'success', data: savedUsers });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'error', message: error.message });
    }
});

module.exports = router