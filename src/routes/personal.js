const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const path = require('path');
const pool = require('../connections/database');

router.get('/med', async(req, res) => {
    const personal = await pool.query(`SELECT * FROM employees WHERE apartment= 'Medico'`);
    console.log('personal: ', personal);

    res.render('personal/status');
});

// to verify dates to generate visits
// this options will be create before but we have to generate options to change colors states when i'll create 
// new dates
router.get('/schedule', (req, res) => {
    res.render('personal/schedule');
});


// to login medical personal
// i mustb create a new login for medical personal
router.get('/login', (req, res) => {
    res.render('personal/login');
});

router.post('/login', async(req, res) => {
    res.send('ok')
});


router.get('/status', async(req, res) => {
    const visitas = await pool.query('SELECT * FROM asig_visitas');
    res.render('personal/status', { control_visitas: visitas });
});





module.exports = router;