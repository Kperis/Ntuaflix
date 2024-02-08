const mysql = require('mysql');
require('dotenv').config();
let databasename;
console.log("NODE_ENV: " + process.env.NODE_ENV);
if (process.env.NODE_ENV === 'undefined') {
    process.env.NODE_ENV = 'run';
    databasename = process.env.DB;
}
if (process.env.NODE_ENV === 'test') {
    databasename = process.env.DB_TEST;
}

const poolConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: databasename,
    connectionLimit: 100,
};

const pool = mysql.createPool(poolConfig);

console.log("NODE_ENV: " + process.env.NODE_ENV);
console.log("Database: " + poolConfig.database); // Log the database property from poolConfig
module.exports = { pool };
