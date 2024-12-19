const { faker } = require('@faker-js/faker')
const { createHash } = require('./validatePassword')

let passwordMock = process.env.PASSWORDMOCK

const generateProduct = () => {
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        departament: faker.commerce.department(),
        stock: parseInt(faker.string.numeric()),
        description: faker.commerce.productDescription(),
        id: faker.database.mongodbObjectId(),
        image: faker.image.url(),
    }
}


exports.generarUsers = () => {
    let numOfProducts = parseInt(faker.string.numeric(1, {bannedDigits: ['0']}))
    let products = []
    for (let i = 0; i < numOfProducts; i++) {
        products.push(generateProduct())
        
    }

    return {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        age: faker.date.birthdate(),
        email: faker.internet.email(),
        role: faker.helpers.arrayElement(['admin', 'user']),
        password: createHash(passwordMock),
        id: faker.database.mongodbObjectId(),
        carts: products,

    }
}