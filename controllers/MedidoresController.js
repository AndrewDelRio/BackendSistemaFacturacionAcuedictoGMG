const express = require('express');
const medidorController = express();
const { Op } = require("sequelize");
const {matriculaModel} = require('../models/MatriculasModel');
const {medidorModel} = require('../models/MedidorModel');
const {JWTokenVerification} = require('../middleware/Authentication');

// obtener un medidor
medidorController.get('/medidorGet', (req, res) => {
    medidorModel.findOne({
        where: {
            [Op.or]: [
                { id_medidor: req.body.id_medidor},
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

// crear un medidor
medidorController.post('/medidorAdd',[JWTokenVerification], (req, res) => {
    let newMedidor = medidorModel.build({
        id_medidor : Number(req.body.id_medidor),
        marca_medidor: req.body.marca_medidor,
        porcentaje_calibracion : number(req.body.porcentaje_calibracion),
        fecha_calibracion : req.body.fecha_calibracion
    });
    medidorModel.findOne({
        where: {
            [Op.or]: [
                { id_medidor: req.body.id_medidor},
            ]
        }
    }).then((result) => {
        if (!result) {
            newMedidor.save().then((medidorSaved) => {
                res.status(200).json({ok: true, message: 'El medidor ha sido agregado correctamente'});
            }).catch((err) => {
                res.status(500).json({ok: false, message: 'Error al agregar el medidor', error: err});
            });
        } else {
            res.status(200).json({ok: false, message: 'El medidor ya existe'});
        }
    }).catch((err) => {
        res.status(500).json({ok: false, message: 'Error al conectarse a la base de datos', error: err});
    });
});

module.exports = {medidorController};