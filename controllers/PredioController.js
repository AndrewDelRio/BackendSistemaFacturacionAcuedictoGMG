const express = require('express');
const predioController = express();
const { Op } = require("sequelize");
const {predioModel} = require('../models/PrediosModel');
const {JWTokenVerification} = require('../middleware/Authentication');

// obtener un predio
predioController.get('/predioGet',[JWTokenVerification], (req, res) => {
    predioModel.findOne({
        where: {
            [Op.or]: [
                { id_numero_predial: req.body.id_numero_predial},
            ]
        }
    }).then((result) => {
        if (result) {
            return res.status(200).json({ok: true, result: result});
        } else {
            res.status(200).json({ok: false, message: 'El Id del predio no existe'});
        }
    }).catch((err) => {
        res.status(500).json({ok: false, message: 'Error al conectarse a la base de datos', error: err});
    });
});

// crear un predio
predioController.post('/predioAdd',[JWTokenVerification], (req, res) => {
    let newPredio = predioModel.build({
        id_numero_predial : req.body.id_numero_predial,
        numero_predial_anterior: req.body.numero_predial_anterior,
        direccion_predio : req.body.direccion_predio,
        nombre_predio : req.body.nombre_predio,
        area_predio: Number(req.body.area_predio),
        area_construccion_predio: Number(req.body.area_construccion_predio),
        destino_economico_predio : req.body.destino_economico_predio,
        id_lugar:Number(req.body.id_lugar)
    });
    predioModel.findOne({
        where: {
            [Op.or]: [
                { id_numero_predial: req.body.id_numero_predial},
            ]
        }
    }).then((result) => {
        if (!result) {
            newMatricula.save().then((matriculaSaved) => {
                res.status(200).json({ok: true, message: 'El predio ha sido agregado correctamente'});
            }).catch((err) => {
                res.status(500).json({ok: false, message: 'Error al agregar el predio', error: err});
            });
        } else {
            res.status(200).json({ok: false, message: 'El predio ya existe'});
        }
    }).catch((err) => {
        res.status(500).json({ok: false, message: 'Error al conectarse a la base de datos', error: err});
    });
});

//modificar predio: nombre predio, destino economico, area construida
 predioController.post('/mpredioUpdate',[JWTokenVerification], (req, res) => {
    predioModel.findOne({
        where: {
            [Op.or]: [
                { id_matricula: req.body.id_matricula},
            ]
        }
    }).then((result) => {
        if (result) {
            result.id_numero_predial  = req.body.id_numero_predial;
            result.id_suscriptor = req.body.id_suscriptor;
            result.estado_matricula = req.body.estado_matricula;
            result.id_tipo_de_servicio = req.body.id_tipo_de_servicio;
            result.id_medidor = req.body.id_medidor;
            result.save().then((matriculaModified) => {
                res.status(200).json({ok: true, message: 'Los datos de la matricula han sido modificados correctamente'});
            }).catch((err) => {
                res.status(500).json({ok: false, message: 'Error al editar los datos de la Matricula', error: err});
            });
        } else {
            res.status(200).json({ok: false, message: 'La Matricula no existe'});
        }
    }).catch((err) => {
        res.status(500).json({ok: false, message: 'Error al conectarse a la base de datos', error: err});
    });
});

//obtener todos los predios 
//modificar para que retorne id_numero_predial y nombre_predio
predioController.get('/allPredios', (req, res) => {
    predioModel.findAll({
        attributes: ['id_numero_predial','nombre_predio']
    }).then((result) => {
        return res.status(200).json({ok: true, result: result});
    }).catch((err) => {
        return res.status(400).json({ok: false, error: err});
    });
});

module.exports = {predioController};