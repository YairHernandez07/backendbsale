'use strict'

module.exports = function (processStatus, listData, nameVariable, nameSearch) {

    let statusCode;
    let resp = {};

    if (processStatus && listData.status) {

        if (listData.list.length > 0) {

            statusCode = 200;
            resp = {
                status: true,
                message: `List de ${nameVariable} encontrados con el patter ${nameSearch} .`,
                list: listData.list,
            }

        } else {

            statusCode = 200;
            resp = {
                status: false,
                message: `No se encontraron ${nameVariable} con el patter ${nameSearch}.`
            }
        }

    } else {
        statusCode = 500;
        resp = {
            status: false,
            message: `Hubo un problema en la consulta.`
        }
    }

    return [statusCode, resp];
}
