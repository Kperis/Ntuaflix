const setupDatabase = require('../import_imdb_data/connect_database');

exports.getSignUp = (req,res, next) => {
    res.status(400).json({
        message: "Hello from Sign up"
    });
};

exports.postSignUp = (req, res, next) => {
    res.status(200).json({
        message: "Sign Up credentials given"
    })
};