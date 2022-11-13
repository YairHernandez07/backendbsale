"use strict";

const mysql = require("mysql");
const Promise = require("bluebird");
const {promisify} = require("util");

// controllers
const inventoryController = require("./controllers/inventory/index");

class Db {

    constructor(options) {
        console.log('----BD-constructor.....');
        options = options || {};
        console.log(options)

        this.host = options.host;
        this.user = options.user;
        this.password = options.password;
        this.database = options.database;
        this.port = options.port;

        // this.setup
        if (!options.setup) {
            this.setup = true;
        } else {
            this.setup = options.setup;
        }
        this.connected = false;
        // this.mysqlInstance = null
        this.mysqlInstance = mysql.createPool({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
            port: this.port
        })
        // conexión:
        this.mysqlInstance.getConnection((err, connection) => {
            if (err) {
                console.log(err)
                return Promise.reject(
                    new Error({
                        message: "BD-Error-Connected",
                        status: 500,
                    })
                );
            }

            // empezar conexión
            if (connection) {
                connection.release();
                this.connected = true;
                return Promise.resolve({
                    message: "BD-Connected",
                    status: 200,
                });
            }
        });
        // configurar peticiones como promesas
        this.mysqlInstance.query = promisify(this.mysqlInstance.query);
    }

    _statusDB() {
        if (!this.connected) {
            return {
                message: "BD no conectada",
                status: false,
            };
        }
    }

    async listCategories() {
        this._statusDB();
        return inventoryController.listCategories(this.mysqlInstance);
    }

    async listProducts() {
        this._statusDB();
        return inventoryController.listProducts(this.mysqlInstance);
    }

    async searchProduct(product) {
        this._statusDB();
        return inventoryController.searchProduct(this.mysqlInstance, product);
    }

    async apllyFiltersProducts(idCategory, idOrderPrice) {
        this._statusDB();
        return inventoryController.apllyFiltersProducts(this.mysqlInstance, idCategory, idOrderPrice);
    }

}

module.exports = Db;