
const { getTitleObject } = require('../middlewares/getTitleObject');
const { pool } = require('../utils/database');


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
        res.status(200).json(titleObject);
    })
    .catch((error) => {
        console.error(error);
        res.status(error.status).json({ message: error.message });
    });
    console.log(titleID);
};
