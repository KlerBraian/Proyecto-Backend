const express       = require('express')
const productRouter = require('./routes/productRouter.js')

// import express from 'express'

const app = express()
const PORT = 8080
 // dirname()
// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(__dirname + '/public')) 


app.use('/api/products', productRouter)

app.use((error, req, res, next) => {  //manejamos los errores con middleware
    console.log(error.stack) //stack es una propiedad de los errores que nos muestra el tipo de error
    res.status(500).send('error de server') //esta funcion lo que hace es manejar todos los errores del server para que muestre ese msj ante cualquier error
})

app.listen(PORT, () => {
    console.log('escuchando en el puerto: ', PORT)
})