'use strict'

module.exports = function (processStatus, listData, nameVariable, pattern) {

    let statusCode;
    let resp = {};

    if (processStatus && listData.status) {

        if (listData.list.length > 0) {

            statusCode = 200;
            resp = {
                status: true,
                message: `${pattern} de ${nameVariable} cargada correctamente.`,
                list: listData.list,
            }

        } else {

            statusCode = 200;
            resp = {
                status: false,
                message: `No se encontraron ${nameVariable} en la BD.`
            }
        }

    } else {
        statusCode = 500;
        resp = {
            status: false,
            message: `No se pudo cargar la ${pattern} de ${nameVariable} cargada correctamente.`
        }
    }

    return [statusCode, resp];
}
