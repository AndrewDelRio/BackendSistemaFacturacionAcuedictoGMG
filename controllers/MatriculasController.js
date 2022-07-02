const express = require('express');
const matriculaController = express();
const { Op } = require("sequelize");
const {matriculaModel} = require('../models/MatriculasModel');
const {JWTokenVerification} = require('../middleware/Authentication');

// obtener una matricula
matriculaController.get('/matriculaGet', (req, res) => {
    matriculaModel.findOne({
        where: {
            [Op.or]: [
                { id_matricula: req.body.id_matricula},
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

// crear una matricula
matriculaController.post('/matriculaAdd', (req, res) => {
    let newMatricula = matriculaModel.build({
        id_matricula : Number(req.body.id_matricula),
        fecha_adjudicación: req.body.fecha_adjudicación,
        estado_matricula : req.body.estado_matricula,
        id_tipo_de_servicio : Number(req.body.id_tipo_de_servicio),
        id_numero_predial: req.body.id_numero_predial,
        id_suscriptor: Number(req.body.id_suscriptor),
        id_medidor : Number(req.body.id_medidor),
        id_financiacion:Number(req.body.id_financiacion)
    });
    matriculaModel.findOne({
        where: {
            [Op.or]: [
                { id_matricula: req.body.id_matricula},
            ]
        }
    }).then((result) => {
        if (!result) {
            newMatricula.save().then((matriculaSaved) => {
                res.status(200).json({ok: true, message: 'La matricula ha sido agregado correctamente'});
            }).catch((err) => {
                res.status(500).json({ok: false, message: 'Error al agregar la matricula', error: err});
            });
        } else {
            res.status(200).json({ok: false, message: 'La matricula ya existe'});
        }
    }).catch((err) => {
        res.status(500).json({ok: false, message: 'Error al conectarse a la base de datos', error: err});
    });
});

//modificar matricula: predio, suscriptor, estado, tipo de servicio,id medidor
 matriculaController.post('/matriculaUpdate', (req, res) => {
    matriculaModel.findOne({
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

// obtener todas las matriculas de un suscriptor
matriculaController.get('/matriculaGetAllBySuscriptor', (req, res) => {
    matriculaModel.findAll({
        where: {
                 id_suscriptor: req.body.id_suscriptor,
        }
    }).then((result) => {
        if (result) {
            return res.status(200).json({ok: true, result: result});
        } else {
            res.status(200).json({ok: false, message: 'El suscriptor no existe o no tiene matriculas asignadas'});
        }
    }).catch((err) => {
        res.status(500).json({ok: false, message: 'Error al conectarse a la base de datos', error: err});
    });
});

module.exports = {matriculaController};