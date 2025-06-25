# Proyecto de Backend.js 
 Proyecto desarrollado en express.js

## Herramientas Utilizadas

1. **Express.js**: Para construir la esctructura del servidor.
2. **Router**: Para gestionar la navegación y las rutas de la aplicación.
3. **Handlebars**: Para gestionar las vistas.
4. **SCSS**: Para el estilo y diseño de la aplicación.
5. **JSON**: Para la gestión de los datos de productos y categorías.
6. **MONGODB**: Para el almacenamiento de datos, registro y autenticación de usuarios.
7. **JavaScript**: Para la lógica de la aplicación.
8. **Passport y JWT**: Modulo para manejar la logica de registro y autenticacion.
9. **Logger**: Modulos para el manejo de mensajes e informacion del servidor.
10. **Swagger,**: Documentacion del proyecto.
11. **Patrones dao y dto, repository, factory, services**: Patrones para manejar la logica de la base de datos
12. **.Env**: Para el manejo de informacion sensible.
13. **Supertest, Mocha, Chai, Faker**: Para hacer pruebas del proyecto.
14. **Docker**: Para instanciar una imagen del proyecto para otros sistemas operativos.
15. **Bcrypt**: Para el hasheo de claves del usuario.


 
## Instalación

1. Clonar el repositorio:
    ```bash```
    ```git clone https://github.com/KlerBraian/Proyecto-Backend.git```
2. Instalar las dependencias:
    ```npm install```
3. Iniciar la aplicación:
    ```npm run dev```
4. Peticiones:
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
  **Proximamente**


## Autor

Kler Braian 

Este proyecto fue realizado como primer entrega para el curso **Backend**, de la carrera de **Desarrollo Full Stack** en **CoderHouse**.

¡Gracias por visitar mi proyecto! 
