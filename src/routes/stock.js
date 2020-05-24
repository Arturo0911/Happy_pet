const express = require('express');
const router = express.Router();
const pool = require('../connections/database');
const { createRandomNumber } = require('../connections/password');
const path = require('path');
const fs = require('fs-extra');

router.get('/add', (req, res) => {
    res.render('stock/add');
});
router.post('/add', async(req, res) => {

    /**
     * files
     */
    const file_name = createRandomNumber();
    const extension = path.extname(req.file.originalname).toLocaleLowerCase();
    const old_path = req.file.path;
    const new_path = path.resolve(`src/public/img/profile_stock/${file_name}${extension}`);
    const body_to_insert = {
        name: req.body.name,
        manufacturer_name: req.body.manufacturer_name,
        tipo_alimento: req.body.tipo_alimento,
        rango_edad_mascota: req.body.rango_edad_mascota,
        foto: file_name + extension,
        descripcion: req.body.descripcion,
        ingredientes_nutricion: req.body.ingredientes_nutricion,
        proteina_cruda_min: req.body.proteina_cruda_min,
        grasa_cruda_min: req.body.grasa_cruda_min,
        fibra_cruda_max: req.body.fibra_cruda_max,
        humedad_max: req.body.humedad_max,
        cenizas_max: req.body.cenizas_max,
        calcio_min: req.body.calcio_min,
        calcio_max: req.body.calcio_max,
        fosforo_min: req.body.fosforo_min,
        fosforo_max: req.body.fosforo_max,
        fecha_elaboracion: req.body.fecha_elaboracion,
        fecha_caducidad: req.body.fecha_caducidad
    };
    if (extension === '.png' || extension === '.jpg' || extension === '.jpeg' || extension === '.gif') {
        fs.rename(old_path, new_path);
    }
    await pool.query('INSERT INTO stock SET?', [body_to_insert]);
    req.flash('success', 'se agregó correctamente el producto');
    res.redirect('/stck/state');
});

router.get('/pack_off', (req, res) => {
    res.render('stock/pack_off');
});


router.get('/state', async(req, res) => {
    const states = await pool.query('SELECT * FROM stock');
    res.render('stock/state', { stocks: states });
});


module.exports = router;