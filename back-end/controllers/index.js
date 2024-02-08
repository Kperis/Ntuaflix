const {pool} = require('../utils/database');
const { getTitleObject } = require('../middlewares/getTitleObject');

exports.getHome = (req, res, next) => {
    // In this contoller i want to show 15 random titles from the database. If there aren't 15 titles in the database, i want to show all of them.
    // If there are no titles in the database, i want to show a message that there are no titles in the database (204)
    const SQLQuery = `
        SELECT
            movie_id AS titleID
        FROM
            TitleObject
        ORDER BY
            RAND()
        LIMIT 15;`;
    pool.getConnection((err,connection) => {
        if (err) {
            console.error('Error getting connection:', err);
            res.sendStatus(500).json({message: 'Internal Server Error'});
            return;
        }
        connection.query(SQLQuery, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.sendStatus(500).json({message: 'Internal Server Error'});
                return;
            }
            const titleIDs = results.map(result => result.titleID);
            const titleObjects = [];
            if (titleIDs.length === 0) {
                res.status(204); // nothing to return
                return;
            }
            console.log('titleIDs:', titleIDs);
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
                //console.log('titleObjects:', titleObjects);
                res.status(200).json(titleObjects);
            };
            getTitleObjects();
            connection.release();
        });
    });
}

exports.getIndex = (req, res, next) => {
    res.status(200).json({message: 'Welcome to NTUAFLIX!'});
}