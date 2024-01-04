const mysql = require('mysql');

/* create connection and export it */
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'ntuaflix',
    password: '',
    port: 3306, // Replace with your actual MySQL port
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = { pool };