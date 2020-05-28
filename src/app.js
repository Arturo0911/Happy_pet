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

class App {


    constructor(port) {
        this.app = express();
        this.port = port;
        this.settings();
        this.middlewares();
        this.routes();

    }


    settings() {

        this.app.set('port', this.port || process.env.PORT || 4000);
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.engine('.hbs', exphs({
            defaultLayout: 'main',
            layoutsDir: path.join(this.app.get('views'), 'layout'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            extname: '.hbs',
            helpers: require('./lib/helpers')
        }));
        this.app.set('view engine', '.hbs');
        this.app.use('/public', express.static(path.join(__dirname, 'public')));
        this.app.use(multer({
            dest: path.join(__dirname, 'public/img/temp')
        }).single('image'));


    }
    middlewares() {
        require('./controllers/authentication');
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

        this.app.use(flash());
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use((req, res, next) => {
            this.app.locals.success = req.flash('success');
            this.app.locals.error = req.flash('error');
            this.app.locals.warning = req.flash('warning');
            this.app.locals.user = req.user;
            next();
        })
    }

    routes() {
        this.app.use('/main', require('./routes/router'));
        this.app.use('/auth', require('./controllers/authentication'));
        this.app.use('/pers', require('./routes/personal'));
        this.app.use('/stck', require('./routes/stock'));
        this.app.use('/custom', require('./routes/customer'));
        this.app.use('/medical', require('./routes/medical'));
    }

    /**
     * here we espcify whats port is setting to run our app
     */
    async Listening_port() {
        /**
         * With socket io using services to simulate a chat between customer and worker
         */
        const server = await this.app.listen(this.app.get('port')); // instantiate the constant to listen function of app
        const SocketIO = require('socket.io'); // after require socket.io
        const io = SocketIO(server); // we create a new variable using the last constant created server
        io.on('connection', (socket) => { // the name of the input must be exactly the same to show by console
            //console.log('new connection', socket.id);
            socket.on('chat:', (data) => { // con el socket.on.emit() enviamos a todos los que están conectados
                io.sockets.emit('chat:', data);
            });

        });
    }
}

/**
 * export class
 */

module.exports = App;