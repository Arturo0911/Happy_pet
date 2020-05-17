/**
 * here declare what's modules will require
 */
const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const path = require('path');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../connections/database');
const { encrypPassword, UnionPasswords, createRandomNumber } = require('../connections/password');


const { ItsNotLoggedIn, ItsLoggedIn } = require('./module');
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async(id, done) => {
    const rows = await pool.query('SELECT * FROM employees WHERE id=?', [id]);
    done(null, rows[0]);
});

router.get('/login', ItsNotLoggedIn, (req, res) => {
    res.render('aut/signin');
});
router.post('/login', ItsNotLoggedIn, async(req, res, next) => {
    passport.authenticate('local_login', {
        successRedirect: '/main/',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next)
});

passport.use('local_login', new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, user, password, done) => {
    const filas = await pool.query('SELECT * FROM employees WHERE user=?', [user]);
    if (filas.length > 0) {
        const user = filas[0];
        const comparePassword = await UnionPasswords(password, user.password);
        if (comparePassword) {
            done(null, user, req.flash('success', 'Bienvenido sr.' + user.name));
        } else {
            done(null, false, req.flash('error', 'incorrect password'));
        }
    } else {

        done(null, false, req.flash('error', 'usuario incorrecto'));

    }
}));







router.get('/signup', ItsNotLoggedIn, (req, res) => {
    res.render('aut/signup');
});

router.post('/signup', ItsNotLoggedIn, passport.authenticate('local_signup', {
    successRedirect: '/auth/login',
    failureRedirect: '/auth/signup',
    failureFlash: true
}));
passport.use('local_signup', new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true

}, async(req, user, password, done) => {
    const body = req.body;
    const name = createRandomNumber();
    console.log('name', name); // name to photo name

    const extname = path.extname(req.file.originalname).toLocaleLowerCase();
    const original_paht = req.file.path;
    const new_target = path.resolve(`src/public/img/profile/${name}${extname}`);
    const Data_insert = {
        ced: body.ced,
        name: body.name,
        lname: body.lname,
        image: name + extname,
        email: body.email,
        address: body.address,
        phone: body.phone,
        apartment: body.apartment,
        turno: body.turno,
        user,
        password
    };
    Data_insert.password = await encrypPassword(password);


    if (extname === '.png' || extname === '.jpg' || extname === '.jpeg' || extname === '.gif') {
        fs.rename(original_paht, new_target);
    }
    const resultado = await pool.query('INSERT INTO employees SET?', [Data_insert]);
    Data_insert.id = resultado.insertId;
    console.log('Data_insert', Data_insert);

    return done(null, Data_insert);
}));



router.get('/logout', ItsLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/auth/login');
});

module.exports = router;