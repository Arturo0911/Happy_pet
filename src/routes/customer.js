const express = require('express');
const router = express.Router();
const pool = require('../connections/database');

router.get('/product', async(req, res) => {
    const custom_product = await pool.query('SELECT * FROM stock');
    res.render('customer/product', { every_product: custom_product });
});

// to send messages outside the login
router.get('/msn', (req, res) => {
    res.render('routes/msn');
});


module.exports = router;