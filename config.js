const mysql = require('mysql');


module.exports = {
    port: process.env.PORT || 3000,
    dbConnection: () => {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'twitter'
        });
    },
    secret: 'geek'
}