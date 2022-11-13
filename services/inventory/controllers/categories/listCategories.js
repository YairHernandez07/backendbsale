'use strict'

const responseServerDataList = require('../../../../utils/responseServer/listItems');

module.exports = async (db, req, res) => {

  let listCategories = {};
  let processStatus = true;

  try {
    listCategories = await db.listCategories()
  } catch (error) {
    processStatus = false
  }

  const [statusCode, resp] = responseServerDataList(processStatus, listCategories, 'categories', 'List');
  res.status(statusCode).send({ resp })

}
