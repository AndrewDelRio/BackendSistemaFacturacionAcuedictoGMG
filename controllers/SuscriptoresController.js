const express = require('express');
const suscriptorController = express();
const { Op } = require("sequelize");
const {suscriptorModel} = require('../models/SuscriptorModel');
const { matriculaModel } = require('../models/MatriculasModel');
const { tipoDeServicioModel } = require('../models/TiposDeServicioModel');
const{tipoDeDocumentoModel} = require('../models/TiposDeDocumento');
const {JWTokenVerification} = require('../middleware/Authentication');
const { predioModel } = require('../models/PrediosModel');

//Buscar suscriptor por id
suscriptorController.get('/getSubscriber/:idSubscriber',[JWTokenVerification], (req, res) => {
    suscriptorModel.findOne({
        where: {
            [Op.or]: [
                { id_suscriptor: req.params.idSubscriber},
            ]
        }
    }).then((result) => {
        if (result) {
            tipoDeDocumentoModel.findOne({
                where: {
                    id_tipo_de_documento: result.id_tipo_de_documento
                }
            }).then((resultTipoDeDocumento) => {
                if (resultTipoDeDocumento) {
                   result.dataValues.abreviatura_tipo_de_documento = resultTipoDeDocumento.abreviatura_tipo_de_documento;
                } else {
                    result.dataValues.abreviatura_tipo_de_documento = 'No definido';
                }
                matriculaModel.findAll({
                    where: {
                        id_suscriptor: req.params.idSubscriber
                    },
                    attributes: ['id_matricula', 'estado_matricula', 'id_tipo_de_servicio', 'id_numero_predial']
                })
                .then((resultEnrollments) => {
                    let countEnrollments = 0;
                    resultEnrollments.forEach(enrollment => {
                        tipoDeServicioModel.findOne({
                            where: {
                                id_tipo_de_servicio: enrollment.dataValues.id_tipo_de_servicio
                            },
                            attributes: ['nombre_servicio']
                        })
                        .then((resultTipoDeServicio) => {
                            enrollment.dataValues.nombre_servicio = resultTipoDeServicio.dataValues.nombre_servicio
                            predioModel.findOne({
                                where: {
                                    id_numero_predial: enrollment.dataValues.id_numero_predial
                                },
                                attributes: ['nombre_predio']
                            })
                            .then((resultProperty) => {
                                enrollment.dataValues.nombre_predio = resultProperty.dataValues.nombre_predio
                                countEnrollments++;
                                if (countEnrollments === resultEnrollments.length) {
                                    result.dataValues.enrollments = resultEnrollments;
                                    return res.status(200).json({ok: true, result: result});
                                }
                            })
                            .catch((err) => {
                                res.status(500).json({ok: false, message: 'Error al conectarse a la base de datos - predios', error: err});
                            })
                        })
                        .catch((err) => {
                            res.status(500).json({ok: false, message: 'Error al conectarse a la base de datos - tipo de servicio', error: err});
                        });
                    });
                })
                .catch((err) => {
                    res.status(500).json({ok: false, message: 'Error al conectarse a la base de datos - matriculas', error: err});
                })
            })
            .catch((err) => {
                res.status(500).json({ok: false, message: 'Error al conectarse a la base de datos - tipos de documento', error: err});
            });
        } else {
            res.status(200).json({ok: false, message: 'El Id registrado no existe'});
        }
    }).catch((err) => {
        res.status(500).json({ok: false, message: 'Error al conectarse a la base de datos - suscriptores', error: err});
    });
});

//registrar suscriptor
suscriptorController.post('/addSubscriber',[JWTokenVerification], (req, res) => {
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

//editar datos del suscriptor
 suscriptorController.post('/suscriptorUpdate',[JWTokenVerification], (req, res) => {
    suscriptorModel.findOne({
        where: {
            [Op.or]: [
                { id_suscriptor: req.body.id_suscriptor},
            ]
        }
    }).then((result) => {
        if (result) {
            result.direccion_suscriptor  = req.body.direccion_suscriptor;
            result.correo_electronico_suscriptor = req.body.correo_electronico_suscriptor;
            result.telefono_suscriptor = req.body.telefono_suscriptor;
            result.save().then((suscriptorModified) => {
                res.status(200).json({ok: true, message: 'Los datos del suscriptor han sido modificados correctamente'});
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

//obtener todos los suscriptores
suscriptorController.get('/getAllSuscri', [JWTokenVerification], (req, res) => {
    suscriptorModel.findAll(
        { 
            attributes:['id_suscriptor','primer_apellido_suscriptor','primer_nombre_suscriptor']
        }
    ).then((result) => {
        return res.status(200).json({ok: true, result: result});
    }).catch((err) => {
        return res.status(400).json({ok: false, error: err});
    });
});
module.exports = {suscriptorController};