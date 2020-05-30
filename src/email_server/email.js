const nodemailer = require('nodemailer');
const pool = require('../connections/database');
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'negreirosarturo@gmail.com',
        pass: 'DreamOn1992'
    }
});

const email_ = {};


email_.MailToSend = async(req, res) => {
    const { id } = req.params
    const data = await pool.query('SELECT * FROM clients WHERE id=?', [id]);
    const { email } = data[0];

    const mail_options = {
        from: 'negreirosarturo@gmail.com',
        to: email,
        subject: 'Hola favian',
        text: 'Esta es otra prueba favian, :v'
    };
    transporter.sendMail(mail_options, (err, info) => {
        if (err) {
            console.log(err.code);
        }

    });
    req.flash('success', 'correo enviado con éxito');
    res.redirect('/main/');
};
module.exports = email_;