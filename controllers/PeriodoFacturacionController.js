const express = require("express");
const periodoFacturacionController = express();
const { Op } = require("sequelize");
const { periodoDeFacturacionModel } = require("../models/PeriodoDeFacturacionModel");
const { JWTokenVerification } = require("../middleware/Authentication");
const { QueryTypes } = require('@sequelize/core');

periodoFacturacionController.post('/addBillingPeriod',[JWTokenVerification], (req, res) => {
    periodoDeFacturacionModel.sequelize.query('CALL crear_periodo_de_facturacion()').then((result) =>{
        return res.status(200).json({ok: true, result: result});
    }).catch((err) => {
        return res.status(400).json({ok: false, message: 'Error al conectarse a la base de datos', err: err});
    }) 
});

module.exports = {periodoFacturacionController};