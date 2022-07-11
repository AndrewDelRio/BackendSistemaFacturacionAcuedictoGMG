const express = require('express');
const financiacingController = express();
const {financiacionModel} = require('../models/FinanciacionesModel');
const {JWTokenVerification} = require('../middleware/Authentication');

// obtener una matricula
financiacingController.get('/getAllFinancing',/**[JWTokenVerification], */(req, res) => {
    financiacionModel.findAll({
        attributes: ['id_financiacion','valor_financiacion','cuotas_financiacion','porcentaje_interes']
    }).then((result) => {
        return res.status(200).json({ok: true, result: result});
    }).catch((err) => {
        return res.status(400).json({ok: false, error: err});
    });
});


module.exports = {financiacingController};