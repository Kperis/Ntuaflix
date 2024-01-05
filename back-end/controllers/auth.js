const { pool } = require('../utils/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
        connection.query('Select email FROM Users WHERE email = ?' , [email], async (error, emailResults) => {
            if(error) {
                console.log(error);
            } 
    
            if(emailResults.length > 0) {
                return res.render('register', {
                    message: "That email is already in use"
                });
            } else{
                connection.query('Select username FROM Authentication WHERE username = ?' , [username], async (error, usernameResults) => {
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
                        let hashedPassword = await bcrypt.hash(password, 8);
                        console.log(hashedPassword);
    
                        connection.query('INSERT INTO Users (firstname, lastname, birthdate, email) VALUES (?, ?, ?, ?)', [firstname, lastname, birthDate, email], (error, insertUserResults) => {
                            if (error) {
                                console.log(error);
                                return res.render('register', {
                                    message: "Registration failed"
                                });
                            } else { //need to change password to hashedpassword, havent completed yet hashing logic
                                connection.query('INSERT INTO Authentication (username, password) VALUES (?,?)', [username, hashedPassword], (error, insertAuthResults) => {
                                    if (error) {
                                        console.log(error);
                                        return res.render('register', {
                                            message: "Registration failed"
                                        });
                                    } else {
                                        console.log(insertAuthResults);
                                        return res.render('login', {
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
    const username = req.body.username;
    const password = req.body.password;

    const query = 'SELECT * FROM Authentication WHERE username = ?';

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        connection.query(query, [username], (err, results) => {
            if (err) {
                connection.release();
                console.error('Error executing query:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (results.length === 0) {
                connection.release();
                return res.status(401).json({ error: 'Invalid username or password' });
            }


            /// ΔΕΝ ΕΧΩ ΕΛΕΓΧΕΙ ΑΝ ΑΠΟ ΕΔΩ ΚΑΙ ΚΑΤΩ ΕΙΝΑΙ ΣΩΣΤΟ. θΕΛΕΙ ΔΕΔΟΜΈΝΑ ΣΤΗΝ ΒΆΣΗ

            const user = results[0];

            // Compare the provided password with the hashed password stored in the database
            bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
                connection.release();

                if (bcryptErr) {
                    console.error('Error comparing passwords:', bcryptErr);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                if (bcryptResult) {
                    // Passwords match, generate a token
                    const token = jwt.sign({ userId: user.id, username: user.username }, 'your-secret-key', { expiresIn: '1h' });

                    return res.status(200).json({ success: true, message: 'Login successful', token });
                } else {
                    // Passwords do not match
                    return res.status(401).json({ error: 'Invalid username or password' });
                }
            });
        });
    });
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