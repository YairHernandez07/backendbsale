'use strict'

const responseServerDataListLike = require('../../../../utils/responseServer/listItemLike');

module.exports = async (db, req, res) => {

    const {product} = req.params; // part's product
    let listSearchProduct = {};
    let processStatus = true;

    try {
        listSearchProduct = await db.searchProduct(product);
    } catch (error) {
        processStatus = false;
    }

    const [statusCode, resp] = responseServerDataListLike(processStatus, listSearchProduct, 'product', product);
    res.status(statusCode).send({resp})

}
