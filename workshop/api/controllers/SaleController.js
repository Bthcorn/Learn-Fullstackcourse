const express = require("express");
const app = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.post('/save', async (req, res, next) => {
 try {
  const rowBillSale = await prisma.billSale.create({
    data: {
      customerName: req.body.customerName,
      customerAddress: req.body.customerAddress,
      customerPhone: req.body.customerPhone,
      payDate: new Date(req.body.payDate),
      payTime: req.body.payTime,
    },
    }
  );

  for (let i = 0; i < req.body.carts.length; i++) {
    const rowProduct = await prisma.product.findFirst({
      where: {
        id: req.body.carts[i].id
      }
    })

    await prisma.billSaleDetail.create({
      data: {
        billSaleId: rowBillSale.id,
        productId: rowProduct.id,
        qty: rowProduct.qty,
        price: rowProduct.price,
        cost: rowProduct.cost
      }
    })

  }

  res.send({ message: 'success' });
 } catch (error) {
    res.status(500).send({ message: error.message });
 }
});

app.get('/list', async (req, res, next) => {
  try {
    const result = await prisma.billSale.findMany({
      orderBy: {
        id: 'desc'
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

app.get('/billInfo/:billSaleId', async (req, res, next) => {
  try {
    const result = await prisma.billSaleDetail.findMany({
      where: {
        billSaleId: parseInt(req.params.billSaleId)
      },
      orderBy: {
        id: 'desc'
      },
      include: {
        Product: true
      }
    });

    res.send({ result: result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get('/updateStatustoPaid/:billSaleId', async (req, res, next) => {
  try {
    await prisma.billSale.update({
      where: {
        id: parseInt(req.params.billSaleId)
      },
      data: {
        status: 'paid'
      }
    });
    res.send({ message: 'success' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get('/updateStatustoSent/:billSaleId', async (req, res, next) => {
  try {
    await prisma.billSale.update({
      where: {
        id: parseInt(req.params.billSaleId)
      },
      data: {
        status: 'sent'
      }
    });
    res.send({ message: 'success' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get('/updateStatustoCanceled/:billSaleId', async (req, res, next) => {
  try {
    await prisma.billSale.update({
      where: {
        id: parseInt(req.params.billSaleId)
      },
      data: {
        status: 'canceled'
      }
    });
    res.send({ message: 'success' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = app