
const setupDatabase = require('../import_imdb_data/connect_database');


exports.getTitle = async (req, res, next) => {
    let titleID = req.params.titleID; // Assuming the titleID is passed as a parameter in the request
    console.log(titleID);

    if (titleID.startsWith(':')) {
        titleID = titleID.substring(1);
    }
    const pool = await setupDatabase();
    // SQL query with a WHERE clause to filter by titleID
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
    // Execute the query with the titleID as a parameter
    try {
        // Use Promise.all to execute all queries concurrently
        const [result1, result2, result3, result4, result5] = await Promise.all([
            pool.query(sqlQuery_1, [titleID]),
            pool.query(sqlQuery_2, [titleID]),
            pool.query(sqlQuery_3, [titleID]),
            pool.query(sqlQuery_4, [titleID]),
            pool.query(sqlQuery_5, [titleID])
        ]);

        // Merge results into a single JSON response
        const mergedResponse = {
            titleInfo: result1[0],
            genres: result2[0],
            akasInfo: result3[0],
            ratings: result4[0],
            contributors: result5[0]
        };
        //console.log(mergedResponse);
        res.json(mergedResponse);
    } catch (error) {
        console.error('Error executing query', error);
        res.sendStatus(500);
    }
};
