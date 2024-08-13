const express       = require('express');
const productRouter = require('./routes/productRouter.js');
const cartsRouter   = require('./routes/cartsRouter.js');
const realtimeproducts    = require('./routes/viewsRouter.js');
const handlebars    = require('express-handlebars')
const {Server} = require ("socket.io");


const app = express();
const PORT = process.env.PORT ||  8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/db'));

// configuración del motor de plantillas
app.engine('handlebars', handlebars.engine())
// configurar la carpeta donde debe tomar las plantillas
app.set('views', __dirname + '/views')
// extención de las plantillas
app.set('view engine', 'handlebars');

app.use('/', realtimeproducts);
app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter)

app.use((error, req, res, next) => { 
    console.log(error.stack) 
    res.status(500).send('error de server') 
});

const httpServer = app.listen(PORT, () => {
    console.log('escuchando en el puerto: ', PORT)})
   
   
const io = new Server(httpServer)
let productos = []; // Inicializar como un array vacío

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    // Enviar productos al nuevo cliente
    socket.emit('productosCargados', productos);

    // Manejar nuevos productos desde el cliente
    socket.on('productosBD', data => {
        productos = [...data];
        io.emit('productosCargados', productos);
    });

    // Manejar la adición de un nuevo producto
    socket.on('productoNuevo', data => {
        productos.push(data);
        io.emit('nuevoProductoCargado', productos);
    });
});