const express = require('express');
const tipoDeDocumentoController = express();
const { Op } = require("sequelize");
const {tipoDeDocumentoModel} = require('../models/TiposDeDocumento');
const {JWTokenVerification} = require('../middleware/Authentication');

// obtener todos los tipos de servicio
tipoDeDocumentoController.get('/getDocumentType', [JWTokenVerification],(req, res) => {
    tipoDeDocumentoModel.findAll({
        attributes: ['id_tipo_de_documento','abreviatura_tipo_de_documento']
    }).then((result) => {
        return res.status(200).json({ok: true, result: result});
    }).catch((err) => {
        return res.status(400).json({ok: false, error: err});
    });
});



