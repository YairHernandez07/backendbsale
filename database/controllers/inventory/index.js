"use strict";

module.exports = {

    // Listar todas las categorías --> para poder llenar el select del filtro para el usuario
    listCategories: async (mysqlInstance) => {

        const query = "SELECT * FROM category";
        let process;

        try {
            process = await mysqlInstance.query(query, []);
        } catch (error) {
            console.log(error);
        }

        if (process !== undefined) {

            return {
                status: true,
                list: process,
            };

        } else {
            return {
                status: false,
                message: "No se listo los cursos del area",
            };
        }
    },

    // Realizar filtro dependiendo lo que el usuario haya seleccionado, 1 o 2 filtros a la vez
    apllyFiltersProducts: async (mysqlInstance, idCategory, idOrderPrice) => {

        let idCategoryInt = parseInt(idCategory);
        let idOrderPriceInt = parseInt(idOrderPrice);

        let query = `SELECT p.name, p.url_image, p.price, p.discount, c.name as name_category FROM product p INNER JOIN category c ON p.category = c.id `;

        /**
         *  Si se manda solo uno de los ids, o ambos
         *  - si solo idCategory --> idCategory > 0 && idOrderPrice===-1
         *  - si solo idOrderPrice --> idCategory ===-1  && idOrderPrice>=0
         *  - ambos con id --> idCategory >0  && idOrderPrice>=0
         */

        if (idCategoryInt > 0 && idOrderPriceInt === -1) { // Only idCategory
            query = query + `WHERE c.id = ${idCategoryInt};`;
        }

        if (idCategoryInt === -1 && idOrderPriceInt >= 0) { // Only idOrderPrice
            if (idOrderPriceInt === 0) {
                query = query + `ORDER BY p.price ASC;`;
            } else {
                query = query + `ORDER BY p.price DESC;`;
            }
        }

        if (idCategoryInt > 0 && idOrderPrice >= 0) { //Together
            if (idOrderPriceInt === 0) {
                query = query + `WHERE c.id = ${idCategoryInt} ORDER BY p.price ASC ;`;
            } else {
                query = query + `WHERE c.id = ${idCategoryInt} ORDER BY p.price DESC ;`;
            }
        }

        let process;

        try {
            process = await mysqlInstance.query(query, []);
        } catch (error) {
            console.log(error);
        }

        if (process !== undefined) {

            return {
                status: true,
                list: process,
            };

        } else {
            return {
                status: false,
                message: "No se listo los cursos del área",
            };
        }
    },

    // Listar todos los productos
    listProducts: async (mysqlInstance) => {

        const query = "SELECT p.name, p.url_image, p.price, p.discount, c.name as name_categoria FROM product p INNER JOIN category c ON p.category = c.id";
        let process;

        try {
            process = await mysqlInstance.query(query, []);
        } catch (error) {
            console.log(error);
        }

        if (process !== undefined) {
            return {
                status: true,
                list: process,
            };
        } else {
            return {
                status: false,
                message: "No se listo Datos de los productos con filtro",
            };
        }
    },

    // Buscar todos los productos que sigan el patron del valor, que el usuario haya ingresado en el input
    searchProduct: async (mysqlInstance, product) => {

        /**
         * Para poder encontrar un patron sin case sensitive, ya que
         * - SELECT * FROM product p WHERE p.name like BINARY '%ñ%'; --> solo detecta a los que tiene ñ solo minúscula (es              case senstitve), Lo mismo para mayúscula, entonces por ellos se uso el RLIKE
         */
        const query = `SELECT * FROM product p WHERE p.name RLIKE(?);`;
        let process;

        try {
            /** declararlos de esta manera, que se encuentra en la documentacion
             * https://www.npmjs.com/package/mysql#escaping-query-values  ||  https://github.com/mysqljs/mysql#escaping-query-values
             * ejemplo segpun la documentación:
             * Alternativamente, puede usar caracteres como marcadores de posición para valores de los que le gustaría haber escapado de esta manera:?
             *      connection.query('SELECT * FROM users WHERE id = ?', [userId], function (error, results, fields) {
             *          if (error) throw error;
             *          ...
             *      });
             * Como menciona la documentación del modulo mysql de npm o yarn, para poder evitar las inyecciones SQL, mediante la siguiente línea
             * Ya esatban declaradas, solo que no habia declarado el product dentro del array, ya que solo hay un endpoint donde se consulta con data que
             * el usuario pueda ingresar, los otros endpoints son get establecidos , pero dependiendo de lo que el usuario elija de forma intuitica
             */
            process = await mysqlInstance.query(query, [product]);
        } catch (error) {
            console.log(error);
        }

        if (process !== undefined) {
            return {
                status: true,
                list: process,
            };
        } else {
            return {
                status: false,
                message: `No se encontró productos con el pattern ${product}`,
            };
        }
    },
};
