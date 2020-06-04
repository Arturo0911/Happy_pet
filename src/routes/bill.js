const express = require('express');
const router = express.Router();
//const pdf = require('pdfkit');
//const fs_ = require('fs');
const { createRandomNumber } = require('../connections/password');
const pool = require('../connections/database');
const path = require('path');
const { createInvoice } = require('../controllers/pdf');
const bill_ = require('../bill/createBill');



router.get('/index', async(req, res) => {
    /**
     * Here we'll do a query for all bill or a pay did
     */
    res.render('bill/index');
});
router.get('/generate_bill/:id', async(req, res) => {
    const { id } = req.params;
    const bill = await pool.query('SELECT * FROM clients WHERE id=?', [id]);
    const values_ = await pool.query('SELECT * FROM  codes_bills');
    res.render('bill/bill', { bill: bill, services: values_ });
});
router.post('/generate_bill', bill_.create);

module.exports = router;