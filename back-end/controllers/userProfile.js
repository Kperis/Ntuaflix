const { pool } = require('../utils/database');

exports.getUserInfo = (req, res, next) => {
    let userID = req.user.userId; // get the userID
    SQLQuery = `
        SELECT
            Users.first_name AS firstname,
            Users.last_name AS lastname,
            Users.birthdate AS birthDate,
            Users.email AS email,
            Authentication.username AS username
        FROM
            Users
        LEFT JOIN Authentication ON Users.user_id = Authentication.user_id
        WHERE
            Users.user_id = ?;`;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        connection.query(SQLQuery, [userID], (err, results) => {
            connection.release(); // Release the connection

            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: "User not found" });
            }

            const userInfo = results[0];
            return res.status(200).json(userInfo);
        });
    });
};