const express       = require('express');
const productRouter = require('./routes/productRouter.js');
const cartsRouter   = require('./routes/cartsRouter.js');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter)

app.use((error, req, res, next) => { 
    console.log(error.stack) 
    res.status(500).send('error de server') 
});

app.listen(PORT, () => {
    console.log('escuchando en el puerto: ', PORT)
});