const express = require("express");
const app = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { register } = require("module");
dotenv.config();

// const userController = require("./UserController");

app.post('/create', async (req, res, next) => {
  try {
    const result = await prisma.product.create({
      data: req.body
    })

    res.send({ message: "Product has been saved"})
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get('/list', async (req, res, next) => {
  try {
    const result = await prisma.product.findMany({
      orderBy: {
        id: 'desc'
      },
      where: {
        status: 'use'
      }
    });
    res.send({ result: result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.delete('/remove/:id', async (req, res, next) => {
  try {
    await prisma.product.update({
      data: {
        status: 'delete'
      },
      where: {
        id: parseInt(req.params.id)
      }
    });
    res.send({ message: "succes" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.put('/update/:id', async (req, res, next) => {
  try {
    await prisma.product.update({
      data: req.body,
      where: {
        id: parseInt(req.params.id)
      }
    });
    res.send({ message: "succes" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = app;
