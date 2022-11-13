let port = '3000';

module.exports = {

    mysql: {

        host: process.env.MYSQL_HOST || 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
        user: process.env.MYSQL_USER || 'bsale_test',
        password: process.env.MYSQL_PASSWORD || 'bsale_test',
        database: process.env.MYSQL_DATABASE || 'bsale_test',

    },
    ports_services: {
        inventory: process.env.PORT || port,
    },
    url_back: {
        url: process.env.WEBSITE || `http://localhost:${port}`
    }
}
