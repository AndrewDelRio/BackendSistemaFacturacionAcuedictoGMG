const express = require('express');
const tipoDeServicioController = express();
const { Op } = require("sequelize");
const {tipoDeServicioModel} = require('../models/TiposDeServicioModel');
const {JWTokenVerification} = require('../middleware/Authentication');

// obtener todos los tipos de servicio
tipoDeServicioController.get('/allServiceType', (req, res) => {
    tipoDeServicioModel.findAll({
        attributes: ['id_tipo_de_servicio','nombre_servicio']
    }).then((result) => {
        return res.status(200).json({ok: true, result: result});
    }).catch((err) => {
        return res.status(400).json({ok: false, error: err});
    });
});

module.exports = {tipoDeServicioController};
