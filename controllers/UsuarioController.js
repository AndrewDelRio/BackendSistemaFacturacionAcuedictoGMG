const express = require('express');
const suscriptorController = express();
const { Op } = require("sequelize");
const {suscriptorModel} = require('../models/UsuariosModels');
const {JWTokenVerification} = require('../middleware/Authentication');


suscriptorController.post('/usuarioUpdate',[JWTokenVerification], (req, res) => {
    suscriptorModel.findOne({
        where: {
            [Op.or]: [
                { id_usuario: req.body.id_usuario},
            ]
        }
    }).then((result) => {
        if (result) {
            result.direccion_suscriptor  = req.body.direccion_suscriptor;
            result.correo_electronico_suscriptor = req.body.correo_electronico_suscriptor;
            result.telefono_suscriptor = req.body.telefono_suscriptor;
            result.save().then((suscriptorModified) => {
                res.status(200).json({ok: true, message: 'Los datos del usuario han sido modificados correctamente'});
            }).catch((err) => {
                res.status(500).json({ok: false, message: 'Error al editar los datos del Suscriptor', error: err});
            });
        } else {
            res.status(200).json({ok: false, message: 'El Suscriptor no existe'});
        }
    }).catch((err) => {
        res.status(500).json({ok: false, message: 'Error al conectarse a la base de datos', error: err});
    });
});