/*const { pool } = require('../utils/database');
const bcrypt = require('bcryptjs');

exports.updateUserProfile = async (req, res, next) => {
    const userId = req.user.userId; // Assuming the user is authenticated using the middleware

    const { username, password } = req.body;

    try {
        const connection = await pool.getConnection();

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
};*/