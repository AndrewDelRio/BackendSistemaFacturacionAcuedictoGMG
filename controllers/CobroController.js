const express = require('express');
const paymentController = express();
const {cobroModel} = require('../models/CobroModel');
const {JWTokenVerification} = require('../middleware/Authentication');

// obtener todos los tipos de cobros
paymentController.get('/getPaymentTypes',/**[JWTokenVerification],*/ (req, res) => {
    cobroModel.sequelize.query('CALL get_payment_types()').then((result) =>{
        return res.status(200).json({ok: true, result: result});
    }).catch((err) => {
        return res.status(200).json({ok: false, message: 'Error al conectarse a la base de datos', err: err});
    })
    
});


module.exports = {paymentController};