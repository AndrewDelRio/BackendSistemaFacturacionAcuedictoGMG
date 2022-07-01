const express = require('express');
const suscriptorController = express();
const { Op } = require("sequelize");
const {suscriptorModel} = require('../models/SuscriptorModel');
const {JWTokenVerification} = require('../middleware/Authentication');

suscriptorController.get('/suscriptorsGet',[JWTokenVerification], (req, res) => {
    suscriptorModel.findOne({
        where: {
            [Op.or]: [
                { id_suscriptor: req.body.id_suscriptor},
            ]
        }
    }).then((result) => {
        if (result) {
            return res.status(200).json({ok: true, result: result});
        } else {
            res.status(200).json({ok: false, message: 'El Id registrado no existe'});
        }
    }).catch((err) => {
        res.status(500).json({ok: false, message: 'Error al conectarse a la base de datos', error: err});
    });
});

suscriptorController.post('/suscriptor',[JWTokenVerification], (req, res) => {
    let newSuscriptor = suscriptorModel.build({
        id_suscriptor: Number(req.body.id_suscriptor),
        primer_apellido_suscriptor: req.body.primer_apellido_suscriptor,
        segundo_apellido_suscriptor: req.body.segundo_apellido_suscriptor,
        primer_nombre_suscriptor: req.body.primer_nombre_suscriptor,
        segundo_nombre_suscriptor: req.body.segundo_nombre_suscriptor,
        fecha_nacimiento_suscriptor: req.body.fecha_nacimiento_suscriptor,
        direccion_suscriptor: req.body.direccion_suscriptor,
        correo_electronico_suscriptor:req.body.correo_electronico_suscriptor,
        telefono_suscriptor: req.body.telefono_suscriptor, 
        id_tipo_de_documento: Number(req.body.id_tipo_de_documento),
    });
    suscriptorModel.findOne({
        where: {
            [Op.or]: [
                { id_suscriptor: req.body.id_suscriptor},
            ]
        }
    }).then((result) => {
        if (!result) {
            newSuscriptor.save().then((suscriptorSaved) => {
                res.status(200).json({ok: true, resume: suscriptorSaved, message: 'El Suscriptor ha sido agregado correctamente'});
            }).catch((err) => {
                res.status(500).json({ok: false, message: 'Error al agregar Suscriptor', error: err});
            });
        } else {
            res.status(200).json({ok: false, message: 'El Suscriptor ya existe'});
        }
    }).catch((err) => {
        res.status(500).json({ok: false, message: 'Error al conectarse a la base de datos', error: err});
    });
});

/**
 * Funcion editar suscriptor
suscriptorController.post('/suscriptorUpdate', (req, res) => {
    suscriptorModel.findOne({
        where: {
            [Op.or]: [
                { id_suscriptor: req.body.id_suscriptor},
            ]
        }
    }).then((result) => {
        if (!result) {
            suscriptorModel.update({},
                {where:
                    id_suscriptor:req.body.id_suscriptor
                });
        } else {
            res.status(200).json({ok: false, message: 'El Suscriptor no existe'});
        }
    }).catch((err) => {
        res.status(500).json({ok: false, message: 'Error al conectarse a la base de datos', error: err});
    });
});
 */
module.exports = {suscriptorController};