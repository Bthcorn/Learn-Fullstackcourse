const express = require('express');
const book = express.Router();


book.get('/list', (req, res) => {
    res.send('Hello Book List');
});

module.exports = book;