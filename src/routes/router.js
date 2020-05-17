const express = require('express');
const router = express.Router();
const { ItsLoggedIn, ItsNotLoggedIn } = require('../controllers/module');

router.get('/', ItsLoggedIn, (req, res) => {
    res.render('routes/index');
});

router.get('/state', ItsLoggedIn, (req, res) => {
    res.render('routes/state');
});


/*router.get('/', ItsLoggedIn, (req, res) => {
    res.render('routes/index');
});

router.get('/', ItsLoggedIn, (req, res) => {
    res.render('routes/index');
});

router.get('/', ItsLoggedIn, (req, res) => {
    res.render('routes/index');
});

router.get('/', ItsLoggedIn, (req, res) => {
    res.render('routes/index');
});

router.get('/', ItsLoggedIn, (req, res) => {
    res.render('routes/index');
});*/


module.exports = router;