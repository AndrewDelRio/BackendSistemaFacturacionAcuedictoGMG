'use strict';
const nodemailer = require('nodemailer');
require('dotenv').config();

this.enviarEmail = () => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'andres.simbaqueba@uptc.edu.co',
        pass: 'FABIAN2308andrew'
    }
});

const mensaje = 'Hola enviando correo desde nodejs';

let mailOptions = {
    from: 'andres.simbaqueba@uptc.edu.co',
    to: 'secretariaacueductogmg@gmail.com',
    subject: 'Prueba de correo',
    text: mensaje
};

  
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email enviado: ' + info.response);
    }
  });
};

module.exports = this;

  