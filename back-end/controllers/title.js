
const { pool } = require('../utils/database');

exports.getTitle = (req, res, next) => {
    let titleID = req.params.titleID;

    if (titleID.startsWith(':')) {
        titleID = titleID.substring(1);
    }

    const sqlQuery_1 = `
        SELECT
            TitleObject.movie_id AS titleID,
            TitleObject.type AS type,
            TitleObject.original_title AS originalTitle,
            TitleObject.image_url AS titlePoster,
            TitleObject.start_year AS startYear,
            TitleObject.end_year AS endYear
        FROM
            TitleObject
        WHERE
            TitleObject.movie_id = ?;`;

    const sqlQuery_2 = `
        SELECT
            Genres.genre AS genre
        FROM
            Genres
        WHERE
            Genres.movie_id = ?;`;

    const sqlQuery_3 = `
        SELECT
            Akas_info.akas_title AS akaTitle,
            Akas_info.region AS regionAbbrev
        FROM 
            Akas_info
        WHERE
            Akas_info.movie_id = ?;`;

    const sqlQuery_4 = `
        SELECT
            Ratings.average_rating AS avRating,
            Ratings.num_votes AS nVotes
        FROM
            Ratings
        WHERE
            Ratings.movie_id = ?;`;

    const sqlQuery_5 = `
        SELECT
            Contributors.contributor_id AS nameID,
            Contributors.primary_name AS name,
            Works.category AS category
        FROM
            Contributors
        INNER JOIN
            Works
        ON
            Contributors.contributor_id = Works.contributor_id
        WHERE
            Works.movie_id = ?;`;

    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting connection:', err);
                res.sendStatus(500);
                return;
            }

            const executeQuery = (query, params) => {
                return new Promise((resolve, reject) => {
                    connection.query(query, params, (error, results) => {
                        if (error) {
                            console.error('Error executing query:', error);
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    });
                });
            };

            Promise.all([
                executeQuery(sqlQuery_1, [titleID]),
                executeQuery(sqlQuery_2, [titleID]),
                executeQuery(sqlQuery_3, [titleID]),
                executeQuery(sqlQuery_4, [titleID]),
                executeQuery(sqlQuery_5, [titleID]),
            ])
            .then(([results1, results2, results3, results4, results5]) => {
                const mergedResponse = {
                    titleInfo: results1[0],
                    genres: results2,
                    akasInfo: results3,
                    ratings: results4,
                    contributors: results5,
                };
                //console.log(mergedResponse);
                res.json(mergedResponse);
            })
            .catch((error) => {
                console.error('Error executing queries:', error);
                res.sendStatus(500);
            })
            .finally(() => {
                connection.release();
            });
        });
    } catch (error) {
        console.error('Error:', error);
        res.sendStatus(500);
    }
};

