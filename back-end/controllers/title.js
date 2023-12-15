const { pool } = require('../utils/database');

exports.getTitle = (req, res, next) => {
    const titleID = req.params.titleID; // Assuming the titleID is passed as a parameter in the request

    // SQL query with a WHERE clause to filter by titleID
    const sqlQuery = `
        SELECT
            tb.tconst AS titleID,
            tb.titleType AS type,
            tb.originalTitle,
            tb.img_url_asset AS titlePoster,
            tb.startYear,
            tb.endYear,
            tb.genres AS genres,
            ta.title AS akaTitle,
            ta.region AS regionAbbrev,
            tp.nconst AS nameID,
            p.primaryName AS name,
            tp.category,
            tr.averageRating AS avRating,
            tr.numVotes AS nVotes
        FROM
            TitleBasics tb
        LEFT JOIN TitleAkas ta ON tb.tconst = ta.titleId
        LEFT JOIN TitlePrincipals tp ON tb.tconst = tp.tconst
        LEFT JOIN Person p ON tp.nconst = p.nconst
        LEFT JOIN TitleRatings tr ON tb.tconst = tr.tconst
        WHERE
            tb.tconst = ?;`;

    // Execute the query with the titleID as a parameter
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ status: 'failed', message: ['connection string1'] });
        }

        // Use the acquired connection to execute the query
        connection.query('USE softeng33;', (err) => {
            connection.release(); // Release the connection after the query

            if (err) {
                console.error(err);
                return res.status(500).json({ status: 'failed', message: ['connection string2'] });
            }

            // Assuming you want to send the results as JSON
            res.status(200).json(results);
        });
    });
};
