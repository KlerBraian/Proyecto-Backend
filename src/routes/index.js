const { Router }    = require('express')
const productRouter = require('./api/productRouter.js')
const cartsRouter = require ("./api/cartsRouter.js")
const viewsRouter = require('./viewsRouter.js');

const router = Router()

router.use('/', viewsRouter);
router.use('/api/products', productRouter);
router.use('/api/carts', cartsRouter)


module.exports = router