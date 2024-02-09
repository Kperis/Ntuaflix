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

        // Check if the titleID exists in the TitleObject table
        const checkTitleQuery = `SELECT * FROM TitleObject WHERE movie_id = ?`;
        connection.query(checkTitleQuery, [titleID], (error, titleResults) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (titleResults.length === 0) {
                // titleID does not exist in TitleObject table
                connection.release();
                return res.status(404).json({ message : 'Title not found' });
            }

            const query = `
                SELECT
                    EXISTS(SELECT 1 FROM Favorites_list WHERE user_id = ? AND movie_id = ?) AS isFavorite,
                    EXISTS(SELECT 1 FROM Watchlist WHERE user_id = ? AND movie_id = ?) AS isWatchlist
            `;

            connection.query(query, [userID, titleID, userID, titleID], (error, results) => {

                if (error) {
                    console.error(error);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                
                console.log(results[0].isFavorite);
                const favoriteResult = results[0].isFavorite;
                const watchlistResult = results[0].isWatchlist;
                const isFavorite = favoriteResult === 1;
                const isWatchlist = watchlistResult === 1;
                connection.release();

                return res.status(200).json({ isFavorite, isWatchlist });
            });
    
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
            connection.release();
            return res.status(500).json({ error: 'Internal server error' });
        }
        const SQLQuery_findTtile = ` 
            SELECT * FROM TitleObject WHERE movie_id = ?
        `;
        connection.query(SQLQuery_findTtile, [titleID], (error, results) => {
            if (error) {
                console.error(error);
                connection.release();
                return res.status(500).json({ error: 'Internal server error' });
            }
            if (results.length === 0) {
                connection.release();
                return res.status(404).json({ message: 'Title not found' });
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
                    connection.release();
                    return res.status(404).json({ message: 'Series not found' });
                }

                const parent_id = results[0].parent_id;
                // Check if the parent exists in the TitleObject table
                const checkTitleQuery = `SELECT * FROM TitleObject WHERE movie_id = ?`;
                connection.query(checkTitleQuery, [parent_id], (error, titleResults) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).json({ error: 'Internal server error' });
                    }
        
                    if (titleResults.length === 0) {
                        // parent_id does not exist in TitleObject table
                        connection.release();
                        return res.status(404).json({ message : 'Series not found' });
                    }
                    // Get and return TitleObject of parent_id
                    console.log(parent_id);
                    getTitleObject(parent_id)
                    .then((titleObject) => {
                        console.log(titleObject);
                        connection.release();
                        res.status(200).json(titleObject);
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(error.status).json({ message: error.message });
                    });
                });
            });
        });
    });
};