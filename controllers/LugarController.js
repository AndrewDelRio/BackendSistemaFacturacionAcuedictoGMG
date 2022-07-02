const express = require('express');
const lugarController = express();
const { Op } = require("sequelize");
const {lugarModel} = require('../models/LugaresModel');
const {JWTokenVerification} = require('../middleware/Authentication');

// obtener los departamentos
lugarController.get('/getDepartments', (req, res) => {
    lugarModel.findAll({
        attributes: ['nombre_lugar'],
        where: {
            [Op.or]: [
                { tipo_lugar: 'DP'},
            ]
        }
    }).then((result) => {
        if (result) {
            return res.status(200).json({ok: true, result: result});
        } else {
            res.status(200).json({ok: false, message: 'No existen departamentos'});
        }
    }).catch((err) => {
        res.status(500).json({ok: false, message: 'Error al conectarse a la base de datos', error: err});
    });
});

// obtener los municipios de un departamento
lugarController.get('/getMunicipiosByDepartments', (req, res) => {
    lugarModel.findAll({
        attributes: ['nombre_lugar'],
        where: {
            [Op.and]: [
                { id_ubicacion : req.body.id_lugar,
                    tipo_lugar: 'MP'},
            ]
        }
    }).then((result) => {
        if (result) {
            return res.status(200).json({ok: true, result: result});
        } else {
            res.status(200).json({ok: false, message: 'No existen departamentos'});
        }
    }).catch((err) => {
        res.status(500).json({ok: false, message: 'Error al conectarse a la base de datos', error: err});
    });
});

// obtener el id de un lugar dado su nombre
lugarController.get('/lugarGet', (req, res) => {
    lugarModel.findOne({
        attributes:['id_lugar'],
        where: {
                nombre_lugar: req.body.nombre_lugar,
        }
    }).then((result) => {
        if (result) {
            return res.status(200).json({ok: true, result: result});
        } else {
            res.status(200).json({ok: false, message: 'No existen coincidencias para la busqueda'});
        }
    }).catch((err) => {
        res.status(500).json({ok: false, message: 'Error al conectarse a la base de datos', error: err});
    });
});

// obtener las veredas de un municipio
lugarController.get('/getVeredasByMunicipio', (req, res) => {
    lugarModel.findAll({
        attributes: ['nombre_lugar'],
        where: {
            [Op.and]: [
                { id_ubicacion : req.body.id_lugar,
                    tipo_lugar: 'VD'},
            ]
        }
    }).then((result) => {
        if (result) {
            return res.status(200).json({ok: true, result: result});
        } else {
            res.status(200).json({ok: false, message: 'No existen veredas asociadas al municipio'});
        }
    }).catch((err) => {
        res.status(500).json({ok: false, message: 'Error al conectarse a la base de datos', error: err});
    });
});

module.exports = {lugarController};