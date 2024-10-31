//CONFIGURACION DE RUTAS DE PRODUCTOS


//LLAMADO DE ARCHIVOS, METODOS Y FUNCIONES A UTILIZAR
const { Router } = require('express');
const { ProductController } = require('../../controllers/product.controller');

const router = Router()

const { getProducts, getProduct, createProduct, updateProduct, deleteProduct} = new ProductController();


//CONFIGURACION DEL GET PARA OBTENER TODOS LOS PRODUCTOS


router.get("/", getProducts);


//CONFIGURACION DEL POST PARA CREAR UN PRODUCTO

router.post("/", createProduct);


//CONFIGURACION DEL GET PARA OBTENER UN PRODUCTO POR ID

router.get('/:pid',getProduct )


//CONFIGURACION DEL PUT PARA MODIFICAR UN PRODUCTO

router.put('/:pid', updateProduct)

//CONFIGURACION DEL DELETE PARA ELIMINAR UN PRODUCTO

router.delete('/:pid', deleteProduct)



module.exports = router