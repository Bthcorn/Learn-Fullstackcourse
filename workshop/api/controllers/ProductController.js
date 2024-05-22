const express = require("express");
const app = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { register } = require("module");
const fileUpload = require("express-fileupload");

dotenv.config();
app.use(fileUpload());
// const userController = require("./UserController");

app.post("/create", async (req, res, next) => {
  try {
    const result = await prisma.product.create({
      data: req.body,
    });

    res.send({ message: "Product has been saved" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/list", async (req, res, next) => {
  try {
    const result = await prisma.product.findMany({
      orderBy: {
        id: "desc",
      },
      where: {
        status: "use",
      },
    });
    res.send({ result: result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.delete("/remove/:id", async (req, res, next) => {
  try {
    await prisma.product.update({
      data: {
        status: "delete",
      },
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.send({ message: "succes" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.put("/update/:id", async (req, res, next) => {
  try {
    await prisma.product.update({
      data: req.body,
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.send({ message: "succes" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.post("/upload", async (req, res, next) => {
  try {
    if (req.files !== undefined && req.files.img !== undefined) {
        const img = req.files.img;
        const fs = require("fs");
        const myDate = new Date();
        const y = myDate.getFullYear();
        const m = myDate.getMonth() + 1;
        const d = myDate.getDate();
        const h = myDate.getHours();
        const mi = myDate.getMinutes();
        const s = myDate.getSeconds();
        const ms = myDate.getMilliseconds();

        const arrFilename = img.name.split(".");
        const ext = arrFilename[arrFilename.length - 1];

        const newName = `${y}${m}${d}${h}${mi}${s}${ms}.${ext}`;


        img.mv("/home/corn/course_fullstackXD/workshop/api/uploads/" + newName, (err) => {
          if (err) {
            throw err;
          } else {
            res.send({ name: newName });
          }
        });
      } else {
      res.status(501).send("not implemented");
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = app;
