const express = require("express");
const app = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function checkSignIn(req, res, next) {
  try {
    const secret = process.env.TOKEN_SECRET;
    const token = req.headers["authorization"];
    const result = jwt.verify(token, secret);

    if (result != undefined) {
      next();
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

function getUserId(req, res) {
  try {
    const secret = process.env.TOKEN_SECRET;
    const token = req.headers["authorization"];
    const result = jwt.verify(token, secret);

    if (result) {
      return result.id;
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

app.post("/signIn", async (req, res) => {
  try {
    if (!req.body.user || !req.body.pass) {
      return res.status(401).send("unauthorized");
    }

    const user = await prisma.user.findFirst({
      select: {
        id: true,
        name: true,
      },
      where: {
        user: req.body.user,
        pass: req.body.pass,
        status: "use",
      },
    });

    if (user != null) {
      const secret = process.env.TOKEN_SECRET;
      const token = jwt.sign(user, secret, { expiresIn: "30d" });

      return res.send({ token: token });
    } 
    res.status(401).send({ message: "unauthorized" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/info", checkSignIn, async (req, res, next) => {
  try {
    const userId = getUserId(req, res);
    const user = await prisma.user.findFirst({
      select: {
        name: true,
      },
      where: {
        id: userId,
      },
    });
    
    if (user != null) {
      return res.send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = app;
