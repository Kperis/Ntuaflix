const {pool} = require('../utils/database');
const {getTitleObject} = require('../middlewares/getTitleObject');

exports.getByGenre = async (req, res, next) => {
    console.log("Request to get titles by genre");
    try {
        const { qgenre, minrating, yrFrom, yrTo } = req.body;
        
        // Optional fields check
        const yearFrom = yrFrom !== undefined ? yrFrom : null;
        const yearTo = yrTo !== undefined ? yrTo : null;

        // console.log(qgenre);
        // console.log(minrating);
        // console.log(yearFrom);
        // console.log(yearTo);
        // res.status(200).json({ message: "OK" }); // Works!
        // SQL queries
        let sqlQuery;
        if (yearFrom !== null && yearTo !== null) {
            sqlQuery = `
                SELECT TitleObject.movie_id AS titleID
                FROM TitleObject
                INNER JOIN Genres ON TitleObject.movie_id = Genres.movie_id
                INNER JOIN Ratings ON TitleObject.movie_id = Ratings.movie_id
                WHERE Genres.genre = ? AND Ratings.average_rating >= ? AND TitleObject.start_year >= ? AND TitleObject.start_year <= ?
            `;
            parameters = [qgenre, minrating, yearFrom, yearTo];
        } else {
            sqlQuery = `
                SELECT TitleObject.movie_id AS titleID
                FROM TitleObject
                INNER JOIN Genres ON TitleObject.movie_id = Genres.movie_id
                INNER JOIN Ratings ON TitleObject.movie_id = Ratings.movie_id
                WHERE Genres.genre = ? AND Ratings.average_rating >= ?
            `;
            parameters = [qgenre, minrating];
        }

        // Rest of the code
        pool.getConnection((err, connection) => {
            if (err) { // Pool connection error
                console.error('Error getting connection:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            connection.query(sqlQuery, parameters ,async (err, results) => {
                if (err) { // Query error
                    connection.release();
                    console.error('Error executing query:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                //console.log(results);
                const titles = [];
                if (results.length === 0) {
                    res.status(204).json({ message : "No data" }); // No data
                    connection.release();
                    return;
                }
                for (let i = 0; i < results.length; i++) {
                    const title = await getTitleObject(results[i].titleID);
                    titles.push(title);
                }
                res.status(200).json(titles); // Everything OK
                // Καθώς θέλω να επιστρέψω μια λίστα και όχι ενα json που περιέχει μια λιστα!!
                // Αν ηθελα να επιστρέψω ενα json που περιέχει μια λιστα θα εγραφα:
                // res.status(200).json({ titles: titles });
                connection.release();
            });
        });

    } catch (error) {
        res.status(400).json({ message: "Bad Request" });
        return;
    }
};