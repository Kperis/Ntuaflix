
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

const database_name = 'ntuaflix';

function setupDatabase() {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        database: database_name,//'ntuaflix_test',
        password: '',
        port: 3306, // Replace with your actual MySQL port
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
        });

    return pool;
}


async function insert_admin(pool)  {
    //console.log(req.body); // grab the data from the form and show it to the terminal
    const {firstname, lastname, birthDate, username, email, password,role} = {
        firstname: 'Cixin',
        lastname: 'Liu',
        birthDate: '1990-01-01',
        username: 'DarkForest',
        email: 'god@gmail.com',
        password: 'DeathEnds',
        role: 'admin'
    }; //getting the data from the form
    const insert_user_querry = 'INSERT INTO Users (first_name, last_name, birthdate, email,role) VALUES (?, ?, ?, ?,"admin")';
    const insert_auth_querry = 'INSERT INTO Authentication (user_id, username, password) VALUES (?,?,?)';

    let hashedPassword =await bcrypt.hash(password, 8);
    console.log(hashedPassword);

    const [result] =await pool.query(insert_user_querry, [firstname, lastname, birthDate, email]);

    const User_id = result.insertId;
    const resutl_2 = await pool.query(insert_auth_querry, [User_id, username, hashedPassword]);

};
async function main() {
    let pool;

    try {
        // Set up the database connection and other common information
        pool = await setupDatabase();
        await insert_admin(pool);
    } catch (error) {
        console.error('Error in main:', error);
    } finally {
        // Close the database connection when done
        if (pool) {
            pool.end();
        }
    }
}
main();
