import React from 'react'

const jwt = require('jsonwebtoken');  
const dotenv = require('dotenv');

dotenv.config();

function checkSignIn(req, res, next) {
  try {
    const secret = process.env.TOKEN_SECRET;
    const token = req.headers['authorization'];
    const result = jwt.verify(token, secret);

    if (result) {
      next();
    } else {
      res.status(401).send({ message: 'unauthorized' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

module.exports = { checkSignIn };