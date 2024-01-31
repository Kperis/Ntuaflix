const {pool} = require('../utils/database');
const { getTitleObject } = require('../middlewares/getTitleObject');
const { ParserOptions } = require('fast-csv');


// The url will be ntuaflix/listsInfo/:titleID
exports.getListsInfo = async (req, res) => {
    let userID = req.user.userId;
    let titleID = req.params.titleID;
    if (titleID.startsWith(':')) {
        titleID = titleID.substring(1);
    }

    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        const query = `
            SELECT
                EXISTS(SELECT 1 FROM Favorites_list WHERE user_id = ? AND movie_id = ?) AS isFavorite,
                EXISTS(SELECT 1 FROM Watchlist WHERE user_id = ? AND movie_id = ?) AS isWatchlist
        `;

        connection.query(query, [userID, titleID, userID, titleID], (error, results) => {
            connection.release();

            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal server error' });
            }

            console.log(results[0].isFavorite);
            const favoriteResult = results[0].isFavorite;
            const watchlistResult = results[0].isWatchlist;
            const isFavorite = favoriteResult === 1;
            const isWatchlist = watchlistResult === 1;

            return res.json({ isFavorite, isWatchlist });
        });
    });
};
    
// The url will be ntuaflix/seriesInfo/:titleID
exports.getSeriesInfo = async (req, res) => {
    let titleID = req.params.titleID;
    if (titleID.startsWith(':')) {
        titleID = titleID.substring(1);
    }

    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        const SQLQuery = `
            SELECT parent_id FROM Episode_info WHERE movie_id = ?
        `;

        connection.query(SQLQuery, [titleID], async (error, results) => {

            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (results.length === 0 || results[0].parent_id === null) {
                return res.status(204).json({ message: 'No data' });
            }

            const parent_id = results[0].parent_id;
            // Get and return TitleObject of parent_id
            console.log(parent_id);
            getTitleObject(parent_id)
            .then((titleObject) => {
                console.log(titleObject);
                res.status(200).json(titleObject);
            })
            .catch((error) => {
                console.error(error);
                res.status(error.status).json({ message: error.message });
            });
        });
    });
};