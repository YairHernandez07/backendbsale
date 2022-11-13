'use strict'

const responseServerDataList = require('../../../../utils/responseServer/listItems');

module.exports = async (db, req, res) => {

  let listProducts = {}
  let processStatus = true

  try {
    listProducts = await db.listProducts()
  } catch (error) {
    processStatus = false
  }

  const [statusCode, resp] = responseServerDataList(processStatus, listProducts, 'products','List');
  res.status(statusCode).send({ resp })

}