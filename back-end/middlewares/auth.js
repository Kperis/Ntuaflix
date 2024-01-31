const jwt = require('jsonwebtoken');
const my_secret_key = process.env.MY_SECRET_KEY;

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, my_secret_key, (err, user) => {
      if (err){
        console.log(err)
        res.sendStatus(401).json({ message: 'Not Authorized' })
      }
      req.user = user
      console.log("You are authenticated!");
      next()
    })
}

module.exports = auth;