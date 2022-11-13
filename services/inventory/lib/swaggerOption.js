const keys = require('../../../keys');

exports.optionSwagger = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Desafio API',
            version: '1.0.0',
            description: 'Documentacion de los endpoints'
        },
        servers: [
            {
                url: keys.url_back.url
            }
        ]
    },
    apis: ["./services/inventory/routes/*.js"]
}
