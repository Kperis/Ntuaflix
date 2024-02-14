const {pool} = require('../utils/database');

exports.createProfile = (req, res, next) => {
    const {firstname, lastname, birthDate, email} = req.body;
    // If a value is null (except favorite_genre) return 400 status code
    if (!firstname || !lastname || !birthDate || !email) {
        return res.status(400).json({ message: 'Please fill out all fields' });
    }
    const userId = req.user.userId;
    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error getting connection:', error);
            return res.status(500).json({
                error: 'Internal Server Error 1'
            });
        }
        const query = 'UPDATE Users SET first_name=?, last_name=?, birthdate=?, email=? WHERE user_id = ?';
        connection.query(query, [firstname, lastname, birthDate, email, userId], (error, results) => {
            if (error) {
                connection.release();
                console.log(error);
                return res.status(500).json({ message: 'Internal Server Error 2' });
            } else {
                connection.release();
                return res.status(201).json({ message: 'Profile updated successfully' });
            }
        });
    });
};