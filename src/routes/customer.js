const express = require('express');
const router = express.Router();
const pool = require('../connections/database');

router.get('/product', async(req, res) => {
    res.render('customer/product');
});

module.exports = router;