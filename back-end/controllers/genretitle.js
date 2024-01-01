const setupDatabase = require('../import_imdb_data/connect_database');

exports.getGenreTitle = async (req, res, next) => {
    const qgenre = req.body.qgenre;
    const minrating = req.body.minrating;
    const yrFrom = req.body.yrFrom;
    const yrTo = req.body.yrTo;

    console.log(qgenre);
    console.log(minrating);
    console.log(yrFrom);
    console.log(yrTo);

    const conditions = [];

    const pool = await setupDatabase();
    // SQL query with a WHERE clause to filter by titleID
    let sqlQuery_1 = `
        SELECT * FROM titleObject 
        INNER JOIN Genres ON titleObject.movie_id = Genres.movie_id
        INNER JOIN Ratings ON titleObject.movie_id = Ratings.movie_id
        WHERE 1=1
    `;
    if (qgenre) {
        sqlQuery_1 += ` AND Genres.genre = ?`;
        conditions.push(qgenre);
    }
    if (minrating) {
        sqlQuery_1 += ` AND Ratings.average_rating >= ?`;
        conditions.push(minrating);
    }
    if (yrFrom) {
        sqlQuery_1 += ` AND titleObject.start_year >= ?`;
        conditions.push(yrFrom);
    }
    if (yrTo) {
        sqlQuery_1 += ` AND titleObject.start_year <= ?`;
        conditions.push(yrTo);
    }
    sqlQuery_1 += ' GROUP BY titleObject.movie_id';

    try {
        // Use Promise.all to execute all queries concurrently
        console.log('Generated SQL Query:', sqlQuery_1);
        console.log('Parameters:', conditions);
        const [rows] = await pool.query(sqlQuery_1, conditions);

        res.json(rows);
    } catch (error) {
        console.error('Error executing query', error);
        res.sendStatus(500);
    }
};
