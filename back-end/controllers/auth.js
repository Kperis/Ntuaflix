const { pool } = require('../utils/database');

exports.register = (req, res, next) => {
    console.log(req.body); // grab the data from the form and show it to the terminal
    
    const {firstname, lastname, birthDate, username, email, password} = req.body; //getting the data from the form
    
    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error getting connection:', error);
            return res.status(500).json({
                error: 'Internal Server Error'
            });
        }
        connection.query('Select email FROM Users WHERE email = ?' , [email], (error, emailResults) => {
            if(error) {
                console.log(error);
            } 
    
            if(emailResults.length > 0) {
                return res.render('register', {
                    message: "That email is already in use"
                });
            } else{
                connection.query('Select username FROM Authentication WHERE username = ?' , [username], (error, usernameResults) => {
                    if(error) {
                        console.log(error);
                    } 
            
                    if(usernameResults.length > 0) {
                        return res.render('register', {
                            message: "That username is already in use"
                        });
                    } else{
                        // Both email and username are unique, proceed with registration logic
    
                        // Hash the password (you should use a proper hashing library in production)
                        //const hashedPassword = /* hash your password here */
    
                        connection.query('INSERT INTO Users (firstname, lastname, birthdate email) VALUES (?, ?, ?, ?)', [firstname, lastname, birthDate, email], (error, insertUserResults) => {
                            if (error) {
                                console.log(error);
                                return res.render('register', {
                                    message: "Registration failed"
                                });
                            } else { //need to change password to hashedpassword, havent completed yet hashing logic
                                connection.query('INSERT INTO Authentication (username, password) VALUES (?,?)', [username, password], (error, insertAuthResults) => {
                                    if (error) {
                                        console.log(error);
                                        return res.render('register', {
                                            message: "Registration failed"
                                        });
                                    } else {
                                        return res.render('/login', {
                                            message: "Registration Completed. Please login to continue"
                                        });
                                    }
                                })                          
                            }
                        });
                    }  
                
                });
            }
        
        });
    });    
};

exports.login = (req, res, next) => {
    console.log(req.body);
    res.status(200).json({
        message: "Hello from login"
    })
};

exports.getRegister = (req,res, next) => {
    res.status(400).json({
        message: "Hello from Sign up"
    });
    // render to register page
};

// implementing get requests for login and register
exports.getLogin = (req, res, next) => {
    res.status(400).json({ message: 'Hello from Login'});
    // render to login html page
};