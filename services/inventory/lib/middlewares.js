const morgan = require('morgan');
const cors = require('cors');

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const {optionSwagger} = require('./swaggerOption');

module.exports = app => {

    app.use(morgan('dev'));
    app.use(cors());
    const specs = swaggerJsDoc(optionSwagger)
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))

}
