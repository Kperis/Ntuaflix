const {pool} = require('../utils/database');

exports.postAddToFavorites = async (req, res) => {
    let userID = req.user.userId;
    let titleID = req.params.titleID;
    if (titleID.startsWith(':')) {
        titleID = titleID.substring(1);
    }

    // Check if titleID exists in TitleObject table
    const checkTitleQuery = `SELECT * FROM TitleObject WHERE movie_id = '${titleID}'`;
    pool.query(checkTitleQuery, (err, titleResults) => {
        if (err) {
            console.error('Error executing query:', err);
            res.sendStatus(500);
            return;
        }

        if (titleResults.length === 0) {
            // titleID does not exist in TitleObject table
            res.status(204).json({ message: 'Title not found' });
            return;
        }

        // Check if titleID is already in the Favorite list of the user
        const checkFavoriteQuery = `SELECT * FROM Favorites_list WHERE user_id = ${userID} AND movie_id = '${titleID}'`;
        pool.query(checkFavoriteQuery, (err, favoriteResults) => {
            if (err) {
                console.error('Error executing query:', err);
                res.sendStatus(500);
                return;
            }

            if (favoriteResults.length > 0) {
                // titleID is already in the Favorite list of the user
                res.status(204).json({ message: 'Title already in favorites' });
                return;
            }

            // Insert titleID into Favorites_list
            const insertFavoriteQuery = `INSERT INTO Favorites_list (user_id, movie_id) VALUES (${userID}, '${titleID}')`;
            pool.query(insertFavoriteQuery, (err, insertResult) => {
                if (err) {
                    console.error('Error executing query:', err);
                    res.sendStatus(500);
                    return;
                }

                res.status(200).json({ message: 'Title added to favorites' });
            });
        });
    });
};


exports.getFavorites = async (req, res) => {
    let userID = req.user.userId;
    let query = `SELECT movie_id as titleID FROM Favorites_list WHERE user_id = ${userID}`;
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection:', err);
            res.sendStatus(500);
            return;
        }
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.sendStatus(500);
                return;
            }
            const titleIDs = results.map(result => result.movie_id);
            const titleObjects = [];
            if (titleIDs.length === 0) {
                // No title has been added to Favorites!
                res.status(204).json(message = 'No data');
                // Maybe return an empty list instead of a message?
                return;
            }
            const getTitleObjects = async () => {
                for (const titleID of titleIDs) {
                    try {
                        const response = await getTitleObject(titleID);
                        titleObjects.push(response);
                    } catch (error) {
                        console.error('Error getting title object:', error);
                        res.sendStatus(500).json({message: 'Internal Server Error'});
                        return;
                    }
                }
                // Returns the list of title objects!
                res.status(200).json(titleObjects);
            };
            getTitleObjects();
            connection.release();
        }
    )});
}

exports.getWatchlist = async (req, res) => {
    let userID = req.user.userId;
    let query = `SELECT movie_id as titleID FROM Watchlist WHERE user_id = ${userID}`;
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection:', err);
            res.sendStatus(500);
            return;
        }
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.sendStatus(500);
                return;
            }
            const titleIDs = results.map(result => result.movie_id);
            const titleObjects = [];
            if (titleIDs.length === 0) {
                // No title has been added to Watchlist!
                res.status(204).json(message = 'No data');
                // Maybe return an empty list instead of a message?
                return;
            }
            const getTitleObjects = async () => {
                for (const titleID of titleIDs) {
                    try {
                        const response = await getTitleObject(titleID);
                        titleObjects.push(response);
                    } catch (error) {
                        console.error('Error getting title object:', error);
                        res.sendStatus(500).json({message: 'Internal Server Error'});
                        return;
                    }
                }
                // Returns the list of title objects!
                res.status(200).json(titleObjects);
            };
            getTitleObjects();
            connection.release();
        }
    )});
}

exports.postAddToWatchlist = async (req, res) => {
    let userID = req.user.userId;
    let titleID = req.params.titleID;
    if (titleID.startsWith(':')) {
        titleID = titleID.substring(1);
    }
    // Check if titleID exists in TitleObject table
    const checkTitleQuery = `SELECT * FROM TitleObject WHERE movie_id = '${titleID}'`;
    pool.query(checkTitleQuery, (err, titleResults) => {
        if (err) {
            console.error('Error executing query:', err);
            res.sendStatus(500);
            return;
        }

        if (titleResults.length === 0) {
            // titleID does not exist in TitleObject table
            res.status(204).json({ message: 'Title not found' });
            return;
        }

        // Check if titleID is already in the Watchlist of the user
        const checkWatchlistQuery = `SELECT * FROM Watchlist WHERE user_id = ${userID} AND movie_id = '${titleID}'`;
        pool.query(checkWatchlistQuery, (err, watchlistResults) => {
            if (err) {
                console.error('Error executing query:', err);
                res.sendStatus(500);
                return;
            }

            if (watchlistResults.length > 0) {
                // titleID is already in the Watchlist of the user
                res.status(204).json({ message: 'Title already in watchlist' });
                return;
            }

            // Insert titleID into Watchlist
            const insertWatchlistQuery = `INSERT INTO Watchlist (user_id, movie_id) VALUES (${userID}, '${titleID}')`;
            pool.query(insertWatchlistQuery, (err, insertResult) => {
                if (err) {
                    console.error('Error executing query:', err);
                    res.sendStatus(500);
                    return;
                }

                res.status(200).json({ message: 'Title added to watchlist' });
            });
        });
    });

}
