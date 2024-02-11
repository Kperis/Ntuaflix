const {pool} = require('../utils/database');

exports.createProfile = (req, res, next) => {
    const {firstname, lastname, birthDate, email,favorite_genre} = req.body;
    // If a value is null (except favorite_genre) return 400 status code
    if (!firstname || !lastname || !birthDate || !email) {
        return res.status(400).json({ message: 'Please fill out all fields' });
    }
    const userId = req.user.id;
    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error getting connection:', error);
            return res.status(500).json({
                error: 'Internal Server Error 1'
            });
        }
        connection.query('UPDATE Users SET first_name = ?, last_name = ?, birthdate = ?, email = ? WHERE user_id = ?', [firstname, lastname, birthDate, email, userId], (error, results) => {
            if (error) {
                connection.release();
                console.log(error);
                return res.status(500).json({ message: 'Internal Server Error 2' });
            } else {
                connection.release();
                return res.status(200).json({ message: 'Profile updated successfully' });
            }
        });
    });
};