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
      }
    });
    res.send({ result: result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


module.exports = app