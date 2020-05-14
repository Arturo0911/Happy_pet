/**
 * import modules
 */
const express = require('express');
const session = require('express-session');
const exphs = require('express-handlebars');
const path = require('path');
const multer = require('multer');
const morgan = require('morgan');
const flash = require('connect-flash');
const passport = require('passport');
const Mysqlstore = require('express-mysql-session');
/**
 * class place
 */
require('./controllers/authentication');
class App {


    constructor(port) {
        this.app = express();
        this.port = port;
        this.settings();
        this.middlewares();
        this.routes();

    }


    settings() {
        this.app.use(session({
            secret: 'Happy_pet',
            resave: false,
            saveUninitialized: false,
            store: new Mysqlstore({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'happypet'
            })
        }));
        this.app.set('port', this.port || process.env.PORT || 4000);
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.engine('.hbs', exphs({
            defaultLayout: 'main',
            layoutsDir: path.join(this.app.get('views'), 'layout'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            extname: '.hbs'
        }));
        this.app.set('view engine', '.hbs');
        this.app.use('/public', express.static(path.join(__dirname, 'public')));
        this.app.set(multer({
            dest: path.join(__dirname, 'public/img/temp')
        }).single('image'));

    }
    middlewares() {
        this.app.use(flash());

        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    routes() {
        this.app.use('/main', require('./routes/router'));
        this.app.use('/auth', require('./controllers/authentication'));
    }

    /**
     * here we espcify whats port is setting to run our app
     */
    async Listening_port() {
        await this.app.listen(this.app.get('port'));
    }
}

/**
 * export class
 */

module.exports = App;