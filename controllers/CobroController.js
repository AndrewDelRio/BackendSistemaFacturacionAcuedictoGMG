const express = require('express');
const paymentController = express();
const {cobroModel} = require('../models/CobroModel');
const {JWTokenVerification} = require('../middleware/Authentication');
const { QueryTypes } = require('@sequelize/core');

// obtener todos los tipos de cobros
paymentController.get('/getPaymentTypes',[JWTokenVerification], (req, res) => {
    cobroModel.sequelize.query('CALL get_payment_types()').then((result) =>{
        return res.status(200).json({ok: true, result: result});
    }).catch((err) => {
        return res.status(400).json({ok: false, message: 'Error al conectarse a la base de datos', err: err});
    })
    
});

// obtener todos los cobros asociados a un tipo
paymentController.get('/getPaymentByType/:paymentType',[JWTokenVerification], (req, res) => {
    const query = 'CALL get_payments_by_payment_type(:tipo_cobro)';
    cobroModel.sequelize.query(
        query,
        {type: QueryTypes.select,
        replacements:{tipo_cobro: req.params.paymentType}
        }).then((result) =>{
        return res.status(200).json({ok: true, result: result});
    }).catch((err) => {
        return res.status(400).json({ok: false, message: 'Error al conectarse a la base de datos', err: err});
    })
});


module.exports = {paymentController};