const jwt = require('jsonwebtoken');
const { pool } = require('../utils/database');
const my_secret_key = process.env.MY_SECRET_KEY;

const auth = (req, res, next) => {
    // Check if header authorization is present
    if (!req.header('X-OBSERVATORY-AUTH')) {
      return res.status(400).json({ message: 'Bad Request. Authorization token not provided' });
    }
    // Take the token from the header
    const token = req.header('X-OBSERVATORY-AUTH');
    //console.log("Tokem = "+token)
    
    // Check if the token in null or undefined
    if (!token) {
      return res.status(401).json({ message: 'Not Authorized' });
    }
    number_of_results = 0;
    // Check database if the token has been deactivated
    pool.getConnection((error, connection) => {
      if (error) {
        console.error('Error getting connection:', error);
        return res.status(500).json({ error: 'Internal Server Error 1'});
      }

      connection.query('SELECT * FROM TokenBlacklist WHERE token = ?', [token], (error, results) => {
        if (error) {
          //console.log(error);
          return res.status(500).json({ message: 'Internal Server Error 2' });
        }
        number_of_results = results.length;
        connection.release();
        if (number_of_results > 0) {
          console.log("You are logged out. Try logging in");
          return res.status(401).json({ message: 'You are logged out. Try logging in' });
        }
      });
    });

    // console.log("Number of results: "+number_of_results`);

    // Verify the token
    jwt.verify(token, my_secret_key, (err, user) => {
      if (err){
        //console.log(err)
        res.sendStatus(401).json({ message: 'Not Authorized' })
      }
      req.user = user
      //console.log("AuthMiddleware: You are authenticated!");
      next()
    })
}

module.exports = auth;