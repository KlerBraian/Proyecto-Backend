//CONFIGURACION DE RUTAS DE PRODUCTOS


//LLAMADO DE ARCHIVOS, METODOS Y FUNCIONES A UTILIZAR
const { Router } = require('express');
const { generarUsers } = require('../../utils/mocks');
const { UsersMockDaoMongo } = require('../../daos/Mongo/userMocksDao.mongo');
const { logger } = require('../../utils/logger');

const router = Router()
const usersMockDao = new UsersMockDaoMongo()

router.get('/mockingUsers', async (req, res) => {
    try {
        let users = []
        for (let i = 0; i < 50; i++) {
            users.push(generarUsers())
        }
        res.send({ status: "success", data: users })

    } catch (error) {
        logger.error(error);
        res.status(500).send({ status: 'error', message: error.message });
    }
})

router.get('/generateData', async (req, res) => {
    try {
        let users = await usersMockDao.get()
        res.send({ status: "success", data: users })
    } catch (error) {
        logger.error(error);
        res.status(500).send({ status: 'error', message: error.message });
    }
})

router.post('/generateData', async (req, res) => {
    try {
        let users = []
        for (let i = 0; i < 50; i++) {
            users.push(generarUsers())
        }
        const savedUsers = await usersMockDao.create(users);
        res.status(201).send({ status: 'success', data: savedUsers });
    } catch (error) {
        logger.error(error);
        res.status(500).send({ status: 'error', message: error.message });
    }
});

module.exports = router