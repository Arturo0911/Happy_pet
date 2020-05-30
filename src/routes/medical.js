const express = require('express');
const router = express.Router();

router.get('/index', (req, res) => {
    res.render('medical/index');
});

router.get('/new_historial', (req, res) => {
    res.render('medical/historial');
});
router.post('/new_historial', (req, res) => {
    console.log(req.body);
    res.redirect('/medical/index');
});

module.exports = router;