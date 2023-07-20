const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();
const jwtPrivateKey = process.env.jwtPrivateKey;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  role: {
    type: String,
    default: 'user',
    minlength: 2,
    maxlength: 50
  },
});


userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, role: this.role }, jwtPrivateKey, {
    algorithm: "HS256",
    expiresIn: 60*60,
  });
  return token;
}

const Users = mongoose.model('User', userSchema);
exports.Users = Users;