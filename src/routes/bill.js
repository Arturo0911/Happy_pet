const express = require('express');
const router = express.Router();
//const pdf = require('pdfkit');
//const fs_ = require('fs');
const { createRandomNumber } = require('../connections/password');
const pool = require('../connections/database');
const path = require('path');
const { createInvoice } = require('../controllers/pdf');



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
router.post('/generate_bill', (req, res) => {
    /**
     * first redirect pdf's files into sections bills
     */
    const pdf_name = createRandomNumber();
    /*const invoice = {
        shipping: {
            name: "John Doe",
            address: "1234 Main Street",
            city: "San Francisco",
            state: "CA",
            country: "US",
            postal_code: 94111
        },
        items: [{
                item: "TC 100",
                description: "Toner Cartridge",
                quantity: 2,
                amount: 6000
            },
            {
                item: "USB_EXT",
                description: "USB Cable Extender",
                quantity: 1,
                amount: 2000
            }
        ],
        subtotal: 8000,
        paid: 0,
        invoice_nr: 1234
    };*/


    //createInvoice(invoice, pdf_name);
    //console.log('bill was generated successfully');
    res.redirect('/bill/bill');
});

module.exports = router;