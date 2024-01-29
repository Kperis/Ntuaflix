const jwt = require('jsonwebtoken');
const my_secret_key = process.env.MY_SECRET_KEY;

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, my_secret_key, (err, user) => {
      if (err){
        console.log(err)
        res.sendStatus(400)
      }
      req.user = user
      console.log("User is:" + user);
      next()
    })
}

module.exports = auth;