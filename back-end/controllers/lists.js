const {pool} = require('../utils/database');

exports.postAddToFavorites = async (req, res) => {
    let userID = req.user.userId;
    // Depending on how the titleID is given
    let titleID = req.params.titleID;
    if (titleID.startsWith(':')) {
        titleID = titleID.substring(1);
    }
    //
    let query = `INSERT INTO Favorites_list (user_id, movie_id) VALUES (${userID}, ${titleID})`;
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
            res.status(200).json({message: 'Added to favorites'});
            connection.release();
        }
    )});

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
    // Depending on how the titleID is given
    let titleID = req.params.titleID;
    if (titleID.startsWith(':')) {
        titleID = titleID.substring(1);
    }
    //
    let query = `INSERT INTO Watchlist (user_id, movie_id) VALUES (${userID}, ${titleID})`;
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
            res.status(200).json({message: 'Added to watchlist'});
            connection.release();
        }
    )});

}
