const mysql = require('mysql');
require('dotenv').config();

if (process.env.NODE_ENV === 'undefined') {
    process.env.NODE_ENV = 'run';
    process.env.DB = 'ntuaflix';
}

const poolConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.NODE_ENV === 'test' ? 'ntuaflix_test' : 'ntuaflix', // Choose the appropriate database based on the environment,
};

const pool = mysql.createPool(poolConfig);

console.log("NODE_ENV: " + process.env.NODE_ENV);
console.log("Database: " + poolConfig.database); // Log the database property from poolConfig
module.exports = { pool };
