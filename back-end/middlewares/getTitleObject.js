const { pool } = require('../utils/database');

const getTitleObject = async (titleID) => {
    const sqlQuery_titleInfo = `
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

            const sqlQuery_genreList = `
                SELECT
                    Genres.genre AS genreTitle
                FROM
                    Genres
                WHERE
                    Genres.movie_id = ?;`;

            const sqlQuery_titleAkasList = `
                SELECT
                    Akas_info.akas_title AS akaTitle,
                    Akas_info.region AS regionAbbrev
                FROM 
                    Akas_info
                WHERE
                    Akas_info.movie_id = ?;`;

            const sqlQuery_principalsList = `
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

            const sqlQuery_ratingList = `
                SELECT
                    Ratings.average_rating AS avRating,
                    Ratings.num_votes AS nVotes
                FROM
                    Ratings
                WHERE
                    Ratings.movie_id = ?;`;

            let connection;
            
            try {
                connection = await new Promise((resolve, reject) => {
                    pool.getConnection((err, conn) => {
                        if (err) {
                            console.error('Error getting connection:', err);
                            reject(err);
                        } else {
                            resolve(conn);
                        }
                    });
                });

                const [
                    results1,
                    results2,
                    results3,
                    results4,
                    results5
                ] = await Promise.all([
                    executeQuery(connection, sqlQuery_titleInfo, [titleID]),
                    executeQuery(connection, sqlQuery_titleAkasList, [titleID]),
                    executeQuery(connection, sqlQuery_genreList, [titleID]),
                    executeQuery(connection, sqlQuery_principalsList, [titleID]),
                    executeQuery(connection, sqlQuery_ratingList, [titleID]),
                ]);

                if (results1.length === 0) { // Handle 404 error
                    throw { status: 404, message: 'No title found' };
                }

                const mergedResponse = {
                    titleID: results1[0].titleID,
                    type: results1[0].type,
                    originalTitle: results1[0].originalTitle,
                    titlePoster: results1[0].titlePoster,
                    startYear: results1[0].startYear,
                    endYear: results1[0].endYear,
                    genres: results2,
                    akasInfo: results3,
                    principals: results4,
                    rating: results5,
                };

                return mergedResponse;
            } catch (error) {
                if (error.status === 404) {
                    throw { status: 404, message: 'No title found' };
                } else {
                    throw { status: 500, message: 'Internal server error' }; // Handle all other errors
                }
            } finally {
                if (connection) {
                    connection.release();
                }
            }
        };

const executeQuery = (connection, query, params) => {
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

module.exports = { getTitleObject };
