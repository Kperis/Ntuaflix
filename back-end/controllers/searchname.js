const {pool} = require('../utils/database');
const { getNameObject } = require('../middlewares/getNameObject');

exports.getSearchName = async (req, res, next) => {
    const namePart = req.body.namePart;
    SQLQuery = `
        SELECT
            Contributors.contributor_id AS nameID
        FROM
            Contributors
        WHERE
            Contributors.primary_name LIKE ?;`;
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection:', err);
            res.sendStatus(500).json({message: 'Internal Server Error'});
            return;
        }
        connection.query(SQLQuery,[`%${namePart}%`], (err, results) => {
            //connection.release();
            if (err) {
                console.error('Error executing query:', err);
                res.sendStatus(500).json({message: 'Internal Server Error'});
                return;
            }
            const nameIDs = results.map(result => result.nameID);
            const nameObjects = [];

            if (nameIDs.length === 0) {
                res.status(404).json(message = 'No data');
                return;
            }
            const getNameObjects = async () => {
                for (const nameID of nameIDs) {
                    try {
                        const response = await getNameObject(nameID);
                        nameObjects.push(response);
                    } catch (error) {
                        console.error('Error getting name object:', error);
                        res.sendStatus(500).json({message: 'Internal Server Error'});
                        return;
                    }
                }
                res.status(200).json(nameObjects);
            };
            getNameObjects();
            connection.release();
        }
        );
    });  
};