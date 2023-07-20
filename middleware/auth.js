const jwt = require('jsonwebtoken');
const config = require('config');
require('dotenv').config();
const jwtPrivateKey = process.env.jwtPrivateKey;
module.exports = function (req, res, next) {
  let token = req.header('x-auth-token');
  //trim the token
  if(!token) res.status(400).send('Auth token not found.');
  token = token.trim();  
  if (!token) return res.status(401).send('Access denied. No token provided.');
  try {
    const decoded = jwt.verify(token, jwtPrivateKey);
    req.user = decoded;
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
}