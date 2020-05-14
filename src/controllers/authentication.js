/**
 * here declare what's modules will require
 */
const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const path = require('path');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


router.get('/login', (req, res) => {
    res.render('aut/signin');
});

router.get('/signup', (req, res) => {
    res.render('aut/signup');
    console.log('hola');

});

/***
 * post process with passport authenticate
 */

router.post('/signup', passport.authenticate('local_signup', {
    successRedirect: '/auth/login',
    failureRedirect: '/auth/signup',
    failureFlash: true
}));

/*
 Proccess data and save into database 
*/

passport.use('local_signup', new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) => {
    console.log('Los datos que se insertarán', req.body);

}));



module.exports = router;