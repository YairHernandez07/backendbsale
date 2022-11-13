'use strict'

const Inventory = require('../controllers/index')
const uri = '/inventory'

module.exports = (app, db) => {

    /**
     * @swagger
     *  components:
     *    schemas:
     *      Products:
     *        Type: object
     *        properties:
     *          id:
     *            type: number
     *            description: The id of the product in the BD
     *          name:
     *            type: string
     *            description: The name of the product
     *          url:
     *            type: string
     *            description: The name of the product
     *          price:
     *            type: number
     *            description: The price of the product
     *          discount:
     *            type: number
     *            description: The discount of the product
     *          category:
     *            type: number
     *            description: The category of the product
     *        required:
     *          -name
     *          -price
     *          -category
     *        example:
     *          id: 5
     *          name: ENERGETICA MR BIG
     *          url_image: https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg
     *          price: 1490
     *          discount: 20
     *          category: 1
     */

    /**
     * @swagger
     *  components:
     *    schemas:
     *      Categories:
     *        Type: object
     *        properties:
     *          id:
     *            type: number
     *            description: The id of the category in the BD
     *          name:
     *            type: string
     *            description: The name of the category
     *        required:
     *          -name
     *        example:
     *          id: 1
     *          name: bebida energetic
     */


    /**
     * @swagger
     * tags:
     *  name: Products
     *  description: Products endpoint
     */

    /**
     * @swagger
     * tags:
     *  name: Categories
     *  description: Categories endpoint
     */

    /**
     * @swagger
     * /inventory/products:
     *  get:
     *    summary: Get a products list
     *    tags: [Products]
     *    responses:
     *      200:
     *        description: The list of products
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                resp:
     *                  type: object
     *                  properties:
     *                    status:
     *                      type: boolean
     *                    message:
     *                      type: string
     *                    list:
     *                      type: array
     *                      items:
     *                        $ref: '#/components/schemas/Products'
     *
     *
     */

    // Obtener todos los products de la base de datos
    app.get(`${uri}/products`, (req, res) => {
        Inventory.listProducts(db, req, res)
    });

    /**
     * @swagger
     * /inventory/categories:
     *  get:
     *    summary: Get a categories list
     *    tags: [Categories]
     *    responses:
     *      200:
     *        description: The list of products
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                resp:
     *                  type: object
     *                  properties:
     *                    status:
     *                      type: boolean
     *                    message:
     *                      type: string
     *                    list:
     *                      type: array
     *                      items:
     *                        $ref: '#/components/schemas/Categories'
     *
     *
     */

    // Obtener el id y name de categorías, para ser listadas en el select de los filtros
    app.get(`${uri}/categories`, (req, res) => {
        Inventory.listCategories(db, req, res)
    });


    // aplicar el filtro dependiendo de lo que el usuario haya consultado
    app.get(`${uri}/products/filters/:idCategory/:idOrderPrice`, (req, res) => {
        Inventory.dataFilters(db, req, res)
    });

    // Buscar productos qye sigan el pattern que el usuario ingreso en el formulario
    app.get(`${uri}/search/:product`, (req, res) => {
        Inventory.searchProduct(db, req, res)
    });

}
