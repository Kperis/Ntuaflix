
const { getTitleObject } = require('../middlewares/getTitleObject');
const { pool } = require('../utils/database');
const json2csv = require('json2csv').parse;


exports.getTitle = (req, res, next) => {
    // Check for Bad Request -> 400 status code
    if (Object.keys(req.params).length > 1) {
        return res.status(400).send('Bad Request');
    }
    // Check if the titleID is empty
    if (req.params.titleID === '') {
        return res.status(400).send('Bad Request');
    }
    
    let titleID = req.params.titleID;
    // Testing of getting the user ID from the token
    let userID = req.user.userId;
    console.log("User ID is:" + userID); 
    // WORIKING!!!!!

    if (titleID.startsWith(':')) {
        titleID = titleID.substring(1);
    }

    getTitleObject(titleID)
    .then((titleObject) => {
        //console.log(titleObject);
        if(req.query.format === 'csv') {
            const csv = json2csv(titleObject);
            res.setHeader('Content-disposition', 'attachment; filename=Title.csv');
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csv);
            return;
        }
        return res.status(200).json(titleObject);
    })
    .catch((error) => {
        console.error(error);
        res.status(error.status).json({ message: error.message });
    });
    console.log(titleID);
};
