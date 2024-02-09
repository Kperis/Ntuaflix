const { pool } = require('../utils/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const my_secret_key = process.env.MY_SECRET_KEY;

exports.register = (req, res, next) => {
    //console.log(req.body); // grab the data from the form and show it to the terminal
    
    const {firstname, lastname, birthDate, username, email, password} = req.body; //getting the data from the form
    
    // Check if a value is null

    if (!firstname || !lastname || !birthDate || !username || !email || !password) {
        return res.status(400).json({ message: 'Please fill out all fields' });
    }

    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error getting connection:', error);
            return res.status(500).json({
                error: 'Internal Server Error 1'
            });
        }
        connection.query('Select email FROM Users WHERE email = ?' , [email], async (error, emailResults) => {
            if(error) {
                connection.release();
                console.log(error);
                return res.status(500).json({ message: 'Internal Server Error 2' });
            } 
    
            if(emailResults.length > 0) {
                connection.release();
                return res.status(400).json({ message: 'Email already in use' });
            } else{
                connection.query('Select username FROM Authentication WHERE username = ?' , [username], async (error, usernameResults) => {
                    if(error) {
                        connection.release();
                        console.log(error)
                        return res.status(500).json({ message: 'Internal Server Error 3' });
                    } 
            
                    if(usernameResults.length > 0) {
                        connection.release();
                        return res.status(400).json({ message: 'Username already in use' });
                    } else{
                        // Both email and username are unique, proceed with registration logic
    
                        // Hash the password (you should use a proper hashing library in production)
                        let hashedPassword = await bcrypt.hash(password, 8);
                        console.log(hashedPassword);
    
                        connection.query('INSERT INTO Users (first_name, last_name, birthdate, email) VALUES (?, ?, ?, ?)', [firstname, lastname, birthDate, email], (error, insertUserResults) => {
                            if (error) {
                                connection.release();
                                console.log(error);
                                return res.status(500).json({ message: 'Internal Server Error 4' });
                            } else { //need to change password to hashedpassword, havent completed yet hashing logic
                                const userId = insertUserResults.insertId; // Get the auto-generated user_id
                                console.log("User ID:", userId);
                                connection.query('INSERT INTO Authentication (user_id, username, password) VALUES (?,?,?)', [userId, username, hashedPassword], (error, insertAuthResults) => {
                                    connection.release();
                                    if (error) {
                                        console.log(error);
                                        return res.status(500).json({ message: 'Registration failed' });
                                    } else {
                                        console.log(insertAuthResults);
                                        return res.status(201).json({ message: 'Registration Completed. Please login'});
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


// The login controller creates the Token. This token contains: {username,userID,role} and is valid for 4 hours!
exports.login = (req, res, next) => {
    // Get the username and password encoded as "application/x-www-form-urlencoded"
    const { username, password } = req.body;

    // I want to select all info for the user from the tables Authentication and Users
    const query =  `SELECT a.user_id, a.username, a.password, u.first_name, u.last_name, u.birthdate, u.email, u.role
                    FROM Authentication a
                    JOIN Users u ON a.user_id = u.user_id
                    WHERE a.username = ?`;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        connection.query(query, [username], async (err, results) => {
            if (err) {
                connection.release();
                console.error('Error executing query:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            if (results.length === 0) {
                connection.release();
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            const user = results[0];
            //console.log(user);
            // Compare the provided password with the hashed password stored in the database
            try {
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (passwordMatch) {
                    // Passwords match, generate a token
                    const token = jwt.sign({ userId: user.user_id, username: user.username , role: user.role}, my_secret_key , { expiresIn: '4h' });
                    // When a user logs in successfully, the server generates a token using a secret key. 
                    // The token contains information about the user's identity and authentication status

                    return res.status(200).json({ success: true, message: 'Login successful', token: token });
                } else {
                    // Passwords do not match
                    console.log(passwordMatch);
                    console.log(password);
                    console.log(user.password);
                    return res.status(401).json({ message: 'Invalid username or password' });
                }
            } catch (bcryptErr) {
                connection.release();
                console.error('Error comparing passwords:', bcryptErr);
                return res.status(500).json({ message: 'Internal Server Error' });
            } finally {
                connection.release();
            }
        });
    });
};

exports.logout = (req, res, next) => {
    // add the token to the blacklist
    const token = req.header('X-OBSERVATORY-AUTH');
    // Take expiration date from the token
    const decoded = jwt.decode(token);
    const expirationDate = decoded.exp;
    console.log(expirationDate);
    // convert the expiration date to a date object
    const date = new Date(0);
    date.setUTCSeconds(expirationDate);
    console.log(date);
    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error getting connection:', error);
            return res.status(500).json({ message: 'Internal Server Error 1' });
        }
        connection.query('INSERT INTO TokenBlacklist (token,expiration_date) VALUES (?,?)', [token,date], (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: 'Internal Server Error 2' });
            }
            return res.status(200).json({ message: 'Logout successful' });
        });
    });
};

exports.getRegister = (req,res, next) => {
    res.status(200).json({
        message: "Hello from Sign up"
    });
    // render to register page
};

// implementing get requests for login and register
exports.getLogin = (req, res, next) => {
    res.status(200).json({ message: 'Hello from Login'});
    // render to login page
};
