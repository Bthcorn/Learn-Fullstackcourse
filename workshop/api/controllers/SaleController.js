const express = require("express");
const app = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.post("/save", async (req, res, next) => {
  try {
    const rowBillSale = await prisma.billSale.create({
      data: {
        customerName: req.body.customerName,
        customerAddress: req.body.customerAddress,
        customerPhone: req.body.customerPhone,
        payDate: new Date(req.body.payDate),
        payTime: req.body.payTime,
      },
    });

    for (let i = 0; i < req.body.carts.length; i++) {
      const rowProduct = await prisma.product.findFirst({
        where: {
          id: req.body.carts[i].id,
        },
      });

      await prisma.billSaleDetail.create({
        data: {
          billSaleId: rowBillSale.id,
          productId: rowProduct.id,
          qty: rowProduct.qty,
          price: rowProduct.price,
          cost: rowProduct.cost,
        },
      });
    }

    res.send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/list", async (req, res, next) => {
  try {
    const result = await prisma.billSale.findMany({
      orderBy: {
        id: "desc",
      },
      // where: {
      //   status: 'wait'
      // }
    });
    res.send({ result: result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/billInfo/:billSaleId", async (req, res, next) => {
  try {
    const result = await prisma.billSaleDetail.findMany({
      where: {
        billSaleId: parseInt(req.params.billSaleId),
      },
      orderBy: {
        id: "desc",
      },
      include: {
        Product: true,
      },
    });

    res.send({ result: result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/updateStatustoPaid/:billSaleId", async (req, res, next) => {
  try {
    await prisma.billSale.update({
      where: {
        id: parseInt(req.params.billSaleId),
      },
      data: {
        status: "paid",
      },
    });
    res.send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/updateStatustoSent/:billSaleId", async (req, res, next) => {
  try {
    await prisma.billSale.update({
      where: {
        id: parseInt(req.params.billSaleId),
      },
      data: {
        status: "sent",
      },
    });
    res.send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/updateStatustoCanceled/:billSaleId", async (req, res, next) => {
  try {
    await prisma.billSale.update({
      where: {
        id: parseInt(req.params.billSaleId),
      },
      data: {
        status: "canceled",
      },
    });
    res.send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/dashboard", async (req, res, next) => {
  try {
    let arr = [];
    let myDate = new Date();
    let year = myDate.getFullYear();

    for (let i = 1; i <= 12; i++) {
      let daysInMonth = new Date(year, i, 0).getDate();

      const billSaleinMonth = await prisma.billSale.findMany({
        where: {
          payDate: {
            gte: new Date(year + "-" + i + "-01"),
            lte: new Date(year + "-" + i + "-" + daysInMonth),
          },
        },
      });

      let sumPrice = 0;
      
      for (let j = 0; j < billSaleinMonth.length; j++) {
        const sum = await prisma.billSaleDetail.aggregate({
          _sum: {
            price: true,
          },
          where: {
            billSaleId: billSaleinMonth[j].id,
          },
        });
        sumPrice = sum._sum.price ?? 0;
      }

      arr.push({
        month: i,
        total: sumPrice,
      });
    }

    res.send({ result: arr });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = app;
