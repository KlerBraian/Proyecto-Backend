const { Router } = require('express')
const productRouter = require('./api/productRouter.js')
const cartsRouter = require("./api/cartsRouter.js")
const viewsRouter = require('./viewsRouter.js');
const sessionsRouter= require('./api/sessionsRouter.js')
const userRouter = require('./api/userRouter.js')

const router = Router()

router.use('/', viewsRouter);
router.use('/api/products', productRouter);
router.use('/api/carts', cartsRouter)
router.use('/api/sessions', sessionsRouter)
router.use('/api/users', userRouter)

module.exports = router