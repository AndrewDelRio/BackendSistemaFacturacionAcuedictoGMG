const express = require('express');
const medidorController = express();
const { Op } = require("sequelize");
const {matriculaModel} = require('../models/MatriculasModel');
const {medidorModel} = require('../models/MedidorModel');
const {JWTokenVerification} = require('../middleware/Authentication');

// obtener un medidor
medidorController.get('/getMeasurer', (req, res) => {
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
medidorController.post('/addMeasurer',[JWTokenVerification],(req, res) => {
    let newMedidor = medidorModel.build({
        id_medidor : null,
        marca_medidor: req.body.marca_medidor,
        porcentaje_calibracion : Number(req.body.porcentaje_calibracion),
        fecha_calibracion : req.body.fecha_calibracion
    });
    newMedidor.save().then((medidorSaved) => {
        res.status(200).json({ok: true, message: 'El medidor ha sido agregado correctamente con el ID: ' + medidorSaved.id_medidor, result : medidorSaved });
        }).catch((err) => {
            res.status(500).json({ok: false, message: 'Error al agregar el medidor', error: err});
        }).catch((err) => {
            res.status(500).json({ok: false, message: 'Error al conectarse a la base de datos', error: err});
    });
});

//obtener todos los medidores
medidorController.get('/getAllMeasurers', [JWTokenVerification], (req, res) => {
    medidorModel.findAll(
        { 
            attributes:['id_medidor','marca_medidor','porcentaje_calibracion','fecha_calibracion']
        }
    ).then((result) => {
        return res.status(200).json({ok: true, result: result});
    }).catch((err) => {
        return res.status(400).json({ok: false, error: err});
    });
});

module.exports = {medidorController};