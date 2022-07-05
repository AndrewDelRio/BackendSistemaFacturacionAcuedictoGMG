const express = require('express');
const lugarController = express();
const { Op } = require("sequelize");
const {lugarModel} = require('../models/LugaresModel');
const {JWTokenVerification} = require('../middleware/Authentication');
const { QueryTypes } = require('@sequelize/core');

// obtener los departamentos
lugarController.get('/getDepartments', (req, res) => {
    lugarModel.findAll({
        attributes: ['id_lugar', 'nombre_lugar'],
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
lugarController.get('/getMunicipalityByDepartments/:id_department', (req, res) => {
    lugarModel.findAll({
        attributes: ['id_lugar','nombre_lugar'],
        where: {
            [Op.and]: [
                { id_ubicacion : req.params.id_department,
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
lugarController.get('/lugarGet/:placeName', (req, res) => {
    lugarModel.findOne({
        attributes:['id_lugar','nombre_lugar'],
        where: {
                nombre_lugar: req.params.placeName,
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
lugarController.get('/getSideWalkByMunicipality/:idSideWalk', (req, res) => {
    lugarModel.findAll({
        attributes: ['id_lugar','nombre_lugar'],
        where: {
            [Op.and]: [
                { id_ubicacion : req.params.idSideWalk,
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

lugarController.get('/getNamePlace', (req, res) => {
    const id_lugar = 2002;
    const address = "";
    const query = "call obtain_property_address(:id_lugar, @address);";
    const resultado = "SELECT @address;"
    lugarModel.sequelize.query(query,{
    type: QueryTypes.select,
    replacements:{id_lugar: 2004, address:''}
 }  
    ).then((result) => {
        lugarModel.sequelize.query(resultado,
            {
            type: QueryTypes.select
            }  
            ).then((result) => {
                return res.status(200).json({ok: true, result: result});
            });
    });
});

module.exports = {lugarController};