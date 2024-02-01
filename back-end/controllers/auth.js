const { pool } = require('../utils/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const my_secret_key = process.env.MY_SECRET_KEY;

exports.register = (req, res, next) => {
    console.log(req.body); // grab the data from the form and show it to the terminal
    
    const {firstname, lastname, birthDate, username, email, password} = req.body; //getting the data from the form
    
    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error getting connection:', error);
            return res.status(500).json({
                error: 'Internal Server Error 1'
            });
        }
        connection.query('Select email FROM Users WHERE email = ?' , [email], async (error, emailResults) => {
            if(error) {
                console.log(error);
                return res.status(500).json({ error: 'Internal Server Error 2' });
            } 
    
            if(emailResults.length > 0) {
                return res.status(401).json({ error: 'Email already in use' });
            } else{
                connection.query('Select username FROM Authentication WHERE username = ?' , [username], async (error, usernameResults) => {
                    if(error) {
                        console.log(error)
                        return res.status(500).json({ error: 'Internal Server Error 3' });
                    } 
            
                    if(usernameResults.length > 0) {
                        return res.status(401).json({ error: 'Username already in use' });
                    } else{
                        // Both email and username are unique, proceed with registration logic
    
                        // Hash the password (you should use a proper hashing library in production)
                        let hashedPassword = await bcrypt.hash(password, 8);
                        console.log(hashedPassword);
    
                        connection.query('INSERT INTO Users (first_name, last_name, birthdate, email) VALUES (?, ?, ?, ?)', [firstname, lastname, birthDate, email], (error, insertUserResults) => {
                            if (error) {
                                console.log(error);
                                return res.status(500).json({ error: 'Internal Server Error 4' });
                            } else { //need to change password to hashedpassword, havent completed yet hashing logic
                                const userId = insertUserResults.insertId; // Get the auto-generated user_id
                                console.log("User ID:", userId);
                                connection.query('INSERT INTO Authentication (user_id, username, password) VALUES (?,?,?)', [userId, username, hashedPassword], (error, insertAuthResults) => {
                                    if (error) {
                                        console.log(error);
                                        return res.status(500).json({ error: 'Registration failed' });
                                    } else {
                                        console.log(insertAuthResults);
                                        return res.status(200).json({ message: 'Registration Completed. Please login'});
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

        connection.query(query, [username], async (err, results) => {
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
            try {
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (passwordMatch) {
                    // Passwords match, generate a token
                    const token = jwt.sign({ userId: user.id, username: user.username }, my_secret_key , { expiresIn: '1h' });
                    // When a user logs in successfully, the server generates a token using a secret key. 
                    // The token contains information about the user's identity and authentication status

                    return res.status(200).json({ success: true, message: 'Login successful', token: token });
                } else {
                    // Passwords do not match
                    return res.status(401).json({ error: 'Invalid username or password' });
                }
            } catch (bcryptErr) {
                connection.release();
                console.error('Error comparing passwords:', bcryptErr);
                return res.status(500).json({ error: 'Internal Server Error' });
            } finally {
                connection.release();
            }
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

exports.getProfile = (req,res,next)=>{
    res.status(200).json({ message: 'Hello from Login / Profile'});
}