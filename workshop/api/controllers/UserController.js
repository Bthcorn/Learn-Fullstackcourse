const express = require('express');
const app = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

app.post('/signIn', async (reg, res) => {
  try {
    const user = await prisma.user.findFirst({
      select: {
        id: true,
        name: true,
      },
      where: {
        user: reg.body.user,
        pass: reg.body.pass,
        status: 'use',
      }
    });
    
    if (user != null) {
      const secret = process.env.TOKEN_SECRET;
      const token = jwt.sign(user, secret, { expiresIn: '30d' });

      return res.send({ token: token });
    }
    res.status(401).send({ message: 'unauthorized' });
  } catch (error) {
    res.status(500).send({message : error.message});
  }
})

module.exports = app;