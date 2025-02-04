const chai = require("chai");
const supertest = require("supertest")
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { cartService } = require("../src/services");
const { generateToken } = require("../src/utils/jwt");

const expect = chai.expect
const requester = supertest("http://localhost:8080")
mongoose.connect('mongodb+srv://braiankler30:A0oYf2hBA8XxOuT5@clustercoder.qfkuo.mongodb.net/products?retryWrites=true&w=majority&appName=ClusterCoder/')


describe("Test Cart", () => {
    beforeEach(async function () {
        await mongoose.connection.collection("users").drop();
    });
    let cartId
    describe('testing avanzado de sessions', () => {
        let cookie
        it('El endpoint POST /api/sessions/register debe registrar correctamente a un usuario', async () => {
            const mockUserRegister = {
                first_name: 'Braian',
                last_name: 'Kler',
                email: 'braiankler@gmail.com',
                password: '123456'
            }

            const { statusCode, text } = await requester.post('/api/sessions/register').send(mockUserRegister).redirects(1);  // Seguir la redirección

            expect(statusCode).to.be.oneOf([200, 302]);
            expect(text).to.be.ok;
        })

        it('El endpoint POST /api/sessions/login debe loguear correctamente al usuario, devolver una cookie y asignarle un carrito', async () => {
            const mockUserRegister = {
                first_name: 'Braian',
                last_name: 'Kler',
                email: 'braiankler@gmail.com',
                password: '123456'
            }

            await requester.post('/api/sessions/register').send(mockUserRegister).redirects(1);  // Seguir la redirección

            const mockUser = {
                email: 'braiankler@gmail.com',
                password: '123456'
            };

            const result = await requester.post('/api/sessions/login').send(mockUser).redirects(0);

            expect(result.statusCode).to.be.oneOf([200, 302]);

            const cookieResult = result.headers['set-cookie'][0];
            expect(cookieResult).to.be.ok;

            cookie = {
                name: cookieResult.split('=')[0],
                value: cookieResult.split('=')[1].split(';')[0]
            };

            expect(cookie.name).to.eql('token');
            expect(cookie.value).to.be.ok;

            const decoded = jwt.decode(cookie.value);

            expect(decoded).to.have.property('cartId');
            expect(decoded.cartId).to.be.ok;
            cartId = decoded.cartId
        });


        it('El endpoint GET /api/sessions/current debe recibir la cookie que contiene el usuario y desctructurar correctamente a este', async () => {
            const { _body } = await requester.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`])
            expect(_body.dataUser.email).to.be.eql('braiankler@gmail.com')
        })
    })


    describe("Test de carrito", () => {  
        it("El endpoint POST /api/carts/ debe devolver 401 si el usuario no está autenticado", async () => {
            const productData = {
                product: "66d347e99e787c191d2aa3de",
                quantity: 2
            };

            const cartRes = await requester.post("/api/carts")
                .send(productData);

            expect(cartRes.status).to.equal(401);
            expect(cartRes.body.error).to.equal("Usuario no autenticado");
        });

        // it("Debe agregar un producto al carrito cuando el usuario esté autenticado", async () => {
        //     const mockUserRegister = {
        //         first_name: 'Braian',
        //         last_name: 'Kler',
        //         email: 'braiankler@gmail.com',
        //         password: '123456'
        //     }

        //     await requester.post('/api/sessions/register').send(mockUserRegister).redirects(1);  // Seguir la redirección

        //     const mockUser = {
        //         email: 'braiankler@gmail.com',
        //         password: '123456'
        //     };

        //     // 🔹 Login y obtención de la cookie
        //     const result = await requester.post('/api/sessions/login').send(mockUser);

        //     // Obtener la cookie de autenticación
        //     const cookieResult = result.headers['set-cookie'][0];

        //     const cookie = {
        //         name: cookieResult.split('=')[0],
        //         value: cookieResult.split('=')[1].split(';')[0]
        //     };

        //     // 🔹 Agregar un producto al carrito
        //     const productData = {
        //         product: "66d347e99e787c191d2aa3de",
        //         quantity: 2
        //     };

        //     const cartRes = await requester
        //         .post("/api/carts")
        //         .set("Cookie", `${cookie.name}=${cookie.value}`)
        //         .send(productData);

        //     // 🔹 Verificar respuesta
        //     expect(cartRes.status).to.be.oneOf([200, 302]);
        //     expect(cartRes.body.error).to.not.equal("Usuario no autenticado");
        // })


        it("El endpoint GET /api/carts debe traer correctamente todos los carritos", async () => {
            const { ok, statusCode, _body } = await requester.get("/api/carts");
            expect(ok).to.be.equal(true);
            expect(statusCode).to.be.equal(200);
            console.log(_body)
        });

        it("El endpoint GET /api/carts/:cid debe obtener un carrito por su ID correctamente", async () => {
            const cartId = "679abad6ce366702dc11f37b";  // ID del carrito que deseas obtener
            const response = await requester.get(`/api/carts/${cartId}`);
            expect(response.statusCode).to.equal(200);
            console.log(response.body);

        });


        it("El endpoint PUT /api/carts/:cid debe modificar un carrito por su ID correctamente", async () => {
            const cartId = "679abad6ce366702dc11f37b";  // ID del carrito que deseas modificar
            const response = await requester.put(`/api/carts/${cartId}`).send([]);  // Enviamos un array vacío para vaciar el carrito
            expect(response.statusCode).to.equal(200);  // El código de estado debería ser 200
            console.log(response.body);  // Muestra la respuesta del servidor

        });


        it("El endpoint PUT /api/carts/:cid/product/:pid debe establecer una cantidad específica de un producto a modificar", async () => {
            const cartId = "679bbf99827e7b0767e16ff7";  // ID del carrito que deseas modificar
            const productId = "66d8c254927541bd257fffd6" //ID del producto que deseas modificar del carrito seleccionado
            const newQuantity = 3 //variar la cantidad para probar mas de una vez

            const response = await requester
                .put(`/api/carts/${cartId}/product/${productId}`)
                .send({ quantity: newQuantity, setQuantity: true });

            expect(response.statusCode).to.equal(200);
            console.log(response.body)
            expect(response.body.data.modifiedCount).to.equal(1);
        });


        it("El endpoint PUT /api/carts/:cid/product/:pid debe agregar el producto al carrito si no existe", async () => {
            const cartId = "679bbf99827e7b0767e16ff7";  // ID del carrito que deseas modificar
            const newProductId = "66d775e0211b80320a34917f" //ID del producto que deseas modificar del carrito seleccionado
            const newQuantity = 5

            const response = await requester
                .put(`/api/carts/${cartId}/product/${newProductId}`)
                .send({ quantity: newQuantity });

            expect(response.statusCode).to.equal(200);
            console.log(response.body)
            expect(response.body.data.modifiedCount).to.equal(1);

        });


        it("Debe vaciar un carrito por su ID correctamente", async () => {
            const cartId = "679abad6ce366702dc11f37b";  // ID del carrito que deseas eliminar
            const response = await requester.delete(`/api/carts/${cartId}`);
            expect(response.statusCode).to.equal(200);
            console.log(response.body); // Aquí se imprime el cuerpo de la respuesta

        });

        it("Debe eliminar un producto del carrito por su ID correctamente", async () => {
            const cartId = "679abad6ce366702dc11f37b";  // ID del carrito que deseas eliminar
            const productId = "66d8c254927541bd257fffd6" //ID del producto que deseas eliminar del carrito seleccionado
            const response = await requester.delete(`/api/carts/${cartId}/product/${productId}`);
            expect(response.statusCode).to.equal(200);
            console.log(response.body); // Aquí se imprime el cuerpo de la respuesta

        });

    });

});


