# Proyecto de Backend.js 
 Proyecto desarrollado en express.js
## Instalación

1. Clonar el repositorio:
    ```bash```
    ```git clone https://github.com/KlerBraian/Proyecto-Backend.git```
2. Instalar las dependencias:
    ```npm install```
3. Iniciar la aplicación:
    ```npm run dev```
4. Peticiones con Postman:
   1. **Metodo Get:** Obtener productos de la base de datos(en este caso local) ```http://localhost:8080/api/products```
   2. **Metodo Get:** Obtener un producto especificado por id de la base de datos(en este caso local) ```http://localhost:8080/api/:pid```
   3. **Metodo Post:** Agregar productos a la base de datos(en este caso local) ```http://localhost:8080/api/products``` 
   4. **Metodo Put:** Modificar un producto de la base de datos(en este caso local) ```http://localhost:8080/api/products/:pid```
   5. **Metodo Delete:** Eliminar productos de la base de datos(en este caso local) ```http://localhost:8080/api/products/:pid```
   6. **Metodo Get:** Obtener carritos de la base de datos(en este caso local) ```http://localhost:8080/api/carts```
   7. **Metodo Get:** Obtener un carrito especificado por id de la base de datos(en este caso local) ```http://localhost:8080/api/carts/:cid```
   8. **Metodo Post**: Crear y agregar un carrito con productos a la base de datos(en este caso local) ```http://localhost:8080/api/carts```
   Ejemplo de formato Json de peticion : [{"prodId": 1, "quant": 20}]
   9. **Metodo Post:** Agregar productos o modificar su cantidad en un carrito especificado por id de la base de datos(en este caso local) ```http://localhost:8080/api/carts/:cid/product/:pid```
 Ejemplo de formato Json de peticion : {"quant": 20}
   
## Imagen Docker Link
  **http://localhost:8081/**


## Autor

Kler Braian 

Este proyecto fue realizado como primer entrega para el curso **Backend**, de la carrera de **Desarrollo Full Stack** en **CoderHouse**.

¡Gracias por visitar mi proyecto! 
