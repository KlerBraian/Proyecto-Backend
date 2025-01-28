const {dirname} = require("path")

exports.swaggerOptions = {
    definition : {
        openapi: "3.0.1",
        info: {
            title: "Documentacion de modulo User",
            description: "Esta es la documentacion del module de usuario"
        }
    },
    apis: [`${dirname(__dirname)}/docs/**/*.yaml`]
}