const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.flash('success', 'holis');
    res.render('routes/index');
});


module.exports = router;