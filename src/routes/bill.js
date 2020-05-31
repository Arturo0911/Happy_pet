const express = require('express');
const router = express.Router();
const pdf = require('pdfkit');
const fs_ = require('fs');
const { createRandomNumber } = require('../connections/password');
const pool = require('../connections/database');



router.get('/index', async(req, res) => {
    /**
     * Here we'll do a query for all bill or a pay did
     */
    res.render('bill/index');
});
router.get('/generate_bill/:id', async(req, res) => {
    const { id } = req.params;
    const bill = await pool.query('SELECT * FROM clients WHERE id=?', [id]);
    res.render('bill/bill', { bill: bill });
});
router.get('/generate_bill', (req, res) => {
    /**
     * first redirect pdf's files into sections bills
     */
    res.redirect('/bill/bill');
});

module.exports = router;