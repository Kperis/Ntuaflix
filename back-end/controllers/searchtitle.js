const { pool } = require('../utils/database');


exports.getSearchTitle = async (req, res, next) => {

    const titlePart = req.body.titlePart;

    // SQL query with a WHERE clause to filter by titleID
    const sqlQuery_1 = `
        SELECT * FROM titleObject WHERE titleObject.original_title LIKE ?
        `;

    // Execute the query with the titleID as a parameter
    try {
        pool.getConnection(( err, connection) => {
            if (err) {
                console.error('Error getting connection:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            connection.query(sqlQuery_1,[`%${titlePart}%`], (error, results) => {
                if (error) {
                    connection.release();
                    console.error('Error executing query:', error);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                res.json(results);
            });
        });
    } catch (error) {
        console.error('Error executing query', error);
        res.sendStatus(500);
    }
};
