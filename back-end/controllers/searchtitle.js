
const setupDatabase = require('../import_imdb_data/connect_database');


exports.getSearchTitle = async (req, res, next) => {

    const titlePart = req.body.titlePart;

    const pool = await setupDatabase();
    // SQL query with a WHERE clause to filter by titleID
    const sqlQuery_1 = `
        SELECT * FROM titleObject WHERE titleObject.original_title LIKE ?
        `;

    // Execute the query with the titleID as a parameter
    try {
        // Use Promise.all to execute all queries concurrently
        const [rows] = await pool.query(sqlQuery_1,[`%${titlePart}%`]);

        //console.log(mergedResponse);
        res.json(rows);
    } catch (error) {
        console.error('Error executing query', error);
        res.sendStatus(500);
    }
};
