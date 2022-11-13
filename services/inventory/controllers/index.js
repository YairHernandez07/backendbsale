// Products
const listProducts = require('./products/listProducts');

// Categories
const listCategories = require('./categories/listCategories');

//Filters products
const dataFilters = require('./filters/filtersProducts');

// Search
const searchProduct = require('./products/searchProduct');

module.exports = {
    listProducts,
    searchProduct,

    listCategories,

    dataFilters,
}
