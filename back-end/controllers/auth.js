//const mysql = require('mysql');
const setupDatabase = require('../import_imdb_data/connect_database');
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req, res, next) => {
    console.log(req.body); // grab the data from the form and show it to the terminal
    
    const {firstname, lastname, username, email, password} = req.body; //getting the data from the form
    
    db.query('Select email FROM Users WHERE email = ?' , [email], (error, results) => {
        if(error) {
            console.log(error);
        } 

        if(results.length > 0) {
            return res.render('register', {
                message: "That email is already in use"
            });
        }});
    
    

    db.query('Select username FROM Users WHERE username = ?' , [username]) // check if username already exists

    res.send("Form submitted"); //maybe uneccesary
    res.status(400).json({
        message: "Hello from Sign up"
    });
};

exports.login = (req, res, next) => {
    console.log(req.body);
    res.status(200).json({
        message: "Hello from login"
    })
};

/* implementing get requests for login and register
exports.getLogin = (req, res, next) => {
    res.status(400).json({ message: 'Hello from Login'});
};

exports.getRegister = (req,res, next) => {
    res.status(400).json({
        message: "Hello from Sign up"
    });
};
*/