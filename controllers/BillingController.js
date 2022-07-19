const express = require('express');
const billingController = express();
const {facturaModel} = require('../models/FacturaModel');
const {JWTokenVerification} = require('../middleware/Authentication');
const { QueryTypes } = require('@sequelize/core');

//obtener facturas del ultimo periodo
billingController.get('/getInvoiceLastPeriod',/**[JWTokenVerification],*/ (req, res) => {
    facturaModel.sequelize.query('CALL get_invoice_by_billing_period(get_last_billing_period())').then((result) =>{
        return res.status(200).json({ok: true, result: result});
    }).catch((err) => {
        return res.status(400).json({ok: false, message: 'Error al conectarse a la base de datos', err: err});
    })
    
});

module.exports = {billingController};

