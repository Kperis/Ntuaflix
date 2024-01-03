const setupDatabase = require('../import_imdb_data/connect_database');


exports.getLogin = (req, res, next) => {
    res.status(400).json({ message: 'Hello from Login'});
};

exports.postLogin = (req, res, next) => {
    res.status(200).json({ message: 'Login Sucessfull'});
};