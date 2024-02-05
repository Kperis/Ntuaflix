const jwt = require('jsonwebtoken');
const my_secret_key = process.env.MY_SECRET_KEY;

const auth = (req, res, next) => {
    // Check if header authorization is present
    if (!req.header('Authorization')) {
      return res.status(400).json({ message: 'Bad Request. Authorization token not provided' })
    }
    // Take the token from the header
    const token = req.header('Authorization').replace('Bearer ', '');
    //console.log("Tokem = "+token)
    
    // Check if the token in null or undefined
    if (!token) {
      return res.status(401).json({ message: 'Not Authorized' })
    }

    // Verify the token
    jwt.verify(token, my_secret_key, (err, user) => {
      if (err){
        //console.log(err)
        res.sendStatus(401).json({ message: 'Not Authorized' })
      }
      req.user = user
      console.log("AuthMiddleware: You are authenticated!");
      next()
    })
}

module.exports = auth;