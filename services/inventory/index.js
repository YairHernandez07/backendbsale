const consign = require('consign')

const express = require('express')
const app = express();

const keys = require('../../keys');
const Database = require('../../database/index');
const serviceFolder = '/services/inventory'
const db = new Database(keys.mysql)

consign()
    .include(`${serviceFolder}/lib/middlewares.js`) // agregar configuraciones
    .then(`${serviceFolder}/routes`) // rutas
    .into(app, db) // enviar 'app' a los archivos

app.listen(keys.ports_services.inventory, () => {
    console.log(`Server-Inventory - port: ${keys.ports_services.inventory}`)
});
