const mysql = require('mysql');
const { promisify } = require('util');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'happypet'
});

pool.getConnection((err, connection) => {
    if (err) {
        console.log('Error by: ', err.code);
    }
    if (connection) {
        connection.release();
    }
    return;
});


pool.query = promisify(pool.query);
module.exports = pool;