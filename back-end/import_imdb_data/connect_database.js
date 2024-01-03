const mysql = require('mysql');

async function setupDatabase() {
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

    return pool;
}

module.exports = setupDatabase;