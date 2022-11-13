'use strict'

const responseServerDataList = require('../../../../utils/responseServer/listItems');

module.exports = async (db, req, res) => {

    /**
     * idOrderPrice:
     *      - 0: de menor a mayor
     *      - 1: de mayor a menor
     */
    const {idCategory, idOrderPrice} = req.params;

    let listDataApplyFilters = {};
    let processStatus = true;

    try {
        listDataApplyFilters = await db.apllyFiltersProducts(idCategory, idOrderPrice)
    } catch (error) {
        processStatus = false
    }

    const [statusCode, resp] = responseServerDataList(processStatus, listDataApplyFilters, 'Filters', 'List');
    res.status(statusCode).send({resp})

}
