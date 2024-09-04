//CONFIGURACION PRINCIPAL DEL SERVER

//LLAMADO A FUNCIONES,ARCHIVOS Y METODOS A UTILIZAR
const express = require('express');
const appRouter = require('./routes/index.js')
const handlebars = require('express-handlebars')
const { Server } = require("socket.io");
const ProductManager = require('./daos/FyleSistem/productManager.js');
const { connectDb } = require('./config/index.js');

//CREACION DE LA APP CON EXPRESS Y CONFIGURACION DEL PUERTO
const app = express();
const PORT = process.env.PORT || 8080

//LLAMADO A METODOS DE EXPRESS PARA URL,JSON Y CARPETAS
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

connectDb()

//LLAMADO A LAS RUTAS PARA PODER UTILIZARLAS
app.use(appRouter)
//CONFIGURACION DE LA MUESTRA DE ERRORES DEL SERVIDOR
app.use((error, req, res, next) => {
    console.log(error.stack)
    res.status(500).send('error de server')
});

//CREACION DE LA ESCUCHA AL SERVIDOR
const httpServer = app.listen(PORT, () => {
    console.log('escuchando en el puerto: ', PORT)
})

//CREACION DEL SERVER TIPO SOCKET
const io = new Server(httpServer);

//CREAMOS LA FUNCION PARA USAR EL SOCKET
const productSocket = async (io) => {
    io.on("connection", async socket => {
        const { getProductos, addProducto } = new ProductManager();
        const products = await getProductos();
        socket.emit("products", products); //enviamos la lista de productos al cliente
        socket.on('productoNuevo', async data => {  //recibimos el nuevo producto y lo agregamos
            await addProducto(data)
        });
    })

}

productSocket(io)
