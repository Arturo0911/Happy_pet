const express = require('express');
const router = express.Router();
const { ItsLoggedIn, ItsNotLoggedIn } = require('../controllers/module');
const pool = require('../connections/database');
const path = require('path');
const fs = require('fs-extra');
const { createRandomNumber } = require('../connections/password')

router.get('/', ItsLoggedIn, (req, res) => {
    res.render('routes/index');
});

router.get('/logger', (req, res) => {
    res.render('routes/logger');
});

router.post('/logger', async(req, res) => {

    const file_name = createRandomNumber();
    const old_path = req.file.path;
    const extname = path.extname(req.file.originalname).toLocaleLowerCase(); //extension name from file
    const new_path = path.resolve(`src/public/img/img_pet/${file_name}${extname}`); // destiny we will be save images

    const data_insert = {
        ced: req.body.ced,
        fullname: req.body.fullname,
        pet_name: req.body.pet_name,
        email: req.body.email,
        image: file_name + extname,
        address: req.body.address,
        phone: req.body.phone,
        motivo_visita: req.body.motivo_visita
    };

    if (extname === '.png' || extname === '.jpg' || extname === '.jpeg' || extname === '.gif') {
        fs.rename(old_path, new_path);
    }
    await pool.query('INSERT INTO clients SET?', [data_insert]);
    req.flash('success', 'Cita agendad correctamente');
    res.redirect('/main/state');

});



/*
 first, we need to create form to clients can loger their information about pet
*/
router.get('/state', ItsLoggedIn, async(req, res) => {
    const datas = await pool.query('SELECT * FROM clients');
    res.render('routes/state', { resultado: datas });
});

router.get('/view/:id', async(req, res) => {
    const { id } = req.params;
    const request = await pool.query('SELECT * FROM clients WHERE id =?', [id]);
    res.render('routes/view', { renderizado: request[0] });
});



/**
 * to edit every card
 */
router.get('/edit/:id', async(req, res) => {
    const { id } = req.params;
    //console.log('parametros: ', req.params);
    const edicion = await pool.query('SELECT * FROM clients WHERE id=?', [id]);
    res.render('routes/edit', { editar: edicion[0] });
});

router.post('/edit', async(req, res) => {
    const cuerpo = req.body;
    const data = await pool.query(`SELECT id FROM clients WHERE pet_name = '${cuerpo.pet_name}' and ced = '${cuerpo.ced}'`);
    const { id } = data[0];
    await pool.query('UPDATE clients set? WHERE id =?', [cuerpo, id]);
    req.flash('success', 'Datos actualizados correctamente');
    res.redirect('/main/state');
});



// to send messages outside the login
router.get('/msn', (req, res) => {
    res.render('routes/msn');
});



/**
 * asign visit to home
 */
router.get('/visit', ItsLoggedIn, (req, res) => {
    res.render('routes/visit');
});

router.post('/visit', ItsLoggedIn, (req, res) => {
    res.redirect('main/state');
    //res.render('routes/visit');
});

/*router.get('/', ItsLoggedIn, (req, res) => {
    res.render('routes/index');
});

router.get('/', ItsLoggedIn, (req, res) => {
    res.render('routes/index');
});

router.get('/', ItsLoggedIn, (req, res) => {
    res.render('routes/index');
});*/


module.exports = router;