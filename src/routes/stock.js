const express = require('express');
const router = express.Router();
const pool = require('../connections/database');
const path = require('path');
const fs = require('fs-extra');

router.get('/add', (req, res) => {
    res.render('stock/add');
});


router.get('/pack_off', (req, res) => {
    res.render('stock/pack_off');
});


router.get('/state', (req, res) => {
    res.render('stock/state');
});


module.exports = router;