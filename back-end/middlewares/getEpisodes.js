const {pool} = require('../utils/database');

const getEpisodes = async (titleID) => {
    const sqlQuery_episodes = `
        SELECT
            Episodes.episode_id AS episodeID,
            Episodes.episode_number AS episodeNumber,
            Episodes.season_number AS seasonNumber,
            Episodes.title AS episodeTitle,
            Episodes.release_date AS releaseDate
        FROM
            Episodes
        WHERE
            Episodes.movie_id = ?;`;

    let connection;

    try {
        connection = await new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                if (error) {
                    reject(error);
                }
                resolve(connection);
            });
        });

        const [episodes] = await connection.execute(sqlQuery_episodes, [titleID]);

        connection.release();

        return episodes;
    } catch (error) {
        console.error(error);
        connection.release();
        error.status = 500;
        throw error;
    }
};