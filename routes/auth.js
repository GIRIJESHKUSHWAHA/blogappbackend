const bcrypt = require('bcrypt');
const _ = require('lodash');
const { Users } = require('../models/users');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {

  try {
    let user = await Users.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();

    console.log(token);
    return res.json({ token: token });
  } catch (err) {
    console.log("error while login: ", err);
    return res.end({ err: "error while login" });

  }

});



router.post('/logout', async (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true
  }).status(200).json("User has been logged out.")
});

module.exports = router; 
