const { pool } = require('../utils/database');
const bcrypt = require('bcryptjs');

// PROBLEMATIC !! -> MANO FTIAXTO 

exports.updateProfile = async (req, res, next) => {
    const userId = req.user.userId; // Assuming the user is authenticated using the middleware
    const { username, password } = req.body;
    const SQLQuery = `SELECT * FROM Authentication WHERE username = ? AND user_id != ?`;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        connection.query(SQLQuery, [username, userId], (err, results) => {
            connection.release(); // Release the connection

            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            if (results.length > 0) {
                return res.status(400).json({ error: 'Username already in use by another user' });
            }
            bcrypt.hash(password, 8, (err, hashedPassword) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
            console.log(hashedPassword);
            // Use SET instead of VALUES in the UPDATE query
            connection.query('UPDATE Authentication SET username = ?, password = ? WHERE user_id = ?', [username, hashedPassword, userId], (error) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ error: 'Internal Server Error' });
                } else { // Need to change password to hashed password, haven't completed the hashing logic
                    console.log("Updated Username:", username);
                    return res.status(201).json({ message: 'User profile updated successfully' });
                }
            });
        });
    });
})};



/*
const { pool } = require('../utils/database');
const bcrypt = require('bcryptjs');

exports.updateProfile = async (req, res, next) => {
    const userId = req.user.userId; // Assuming the user is authenticated using the middleware

    const { username, password } = req.body;

    try {
        console.log('Before getting connection');
        const connection = await pool.getConnection();
        console.log('After getting connection');
        // Check if the username is already in use by another user
        const usernameResult = await connection.query('SELECT * FROM Authentication WHERE username = ? AND user_id != ?', [username, userId]);

        if (usernameResult.length > 0) {
            return res.status(401).json({ error: 'Username already in use by another user' });
        }

        // Hash the new password if provided
        let hashedPassword = null;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 8);
        }

        // Update the Authentication table with the new username and/or password
        await connection.query('UPDATE Authentication SET username = ?, password = ? WHERE user_id = ?', [username, hashedPassword, userId]);

        connection.release();

        return res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
        console.error('Error updating user profile:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
*/