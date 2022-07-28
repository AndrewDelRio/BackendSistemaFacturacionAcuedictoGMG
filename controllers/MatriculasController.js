const express = require('express');
const matriculaController = express();
const { Op } = require("sequelize");
const {matriculaModel} = require('../models/MatriculasModel');
const {medidorModel} = require('../models/MedidorModel');
const {historicoMatriculaModel} = require('../models/HistoricosMatricula');
const {JWTokenVerification} = require('../middleware/Authentication');
const { QueryTypes } = require('@sequelize/core');


// obtener una matricula
matriculaController.get('/getEnrollment/:id_enrollment',[JWTokenVerification], (req, res) => {
    matriculaModel.findOne({
        where: {
            [Op.or]: [
                { id_matricula: req.params.id_enrollment},
            ]
        }
    }).then((result) => {
        if (result) {
            const id_matricula = result.id_matricula;
            const query = " call obtain_measurer_by_id_enrollment(:id_matricula)";
            medidorModel.sequelize.query(
                query,
                {type: QueryTypes.select,
                replacements:{id_matricula: result.id_matricula}}
            ).then((resultMedidores) =>{
                result.dataValues.medidores = resultMedidores[0];
                const querySubscriber = " call get_name_subscriber_by_id_matricula(:id_matricula);"
                medidorModel.sequelize.query(
                    querySubscriber,
                    {type: QueryTypes.select,
                    replacements:{id_matricula: result.id_matricula}}
                ).then((resultSubscriber) =>{
                    result.dataValues.subscriber = resultSubscriber[0];
                    const query = " call get_property_name_by_id_matricula(:id_matricula);"
                    medidorModel.sequelize.query(
                        query,
                        {type: QueryTypes.select,
                        replacements:{id_matricula: result.id_matricula}}
                    ).then((resultProperty) =>{
                        result.dataValues.propertyName = resultProperty[0];
                        const query = " call get_service_type_by_id_enrollment(:id_matricula);"
                    medidorModel.sequelize.query(
                        query,
                        {type: QueryTypes.select,
                        replacements:{id_matricula: result.id_matricula}}
                    ).then((resultServiceType) =>{
                        result.dataValues.serviceType = resultServiceType[0];
                        return res.status(200).json({ok: true, result: result});
                    });
                    });
                });
            });
        } else {
            res.status(200).json({ok: false, message: 'El Id registrado no existe'});
        }
    }).catch((err) => {
        res.status(500).json({ok: false, message: 'Error al conectarse a la base de datos', error: err});
    });
});

// crear una matricula
matriculaController.post('/addEnrollment',[JWTokenVerification], (req, res) => {
    let newEnrollment = matriculaModel.build({
        id_matricula : null,
        fecha_adjudicacion: new Date(),
        estado_matricula : 'Adjudicada',
        id_tipo_de_servicio : Number(req.body.id_tipo_de_servicio),
        id_numero_predial: req.body.id_numero_predial,
        id_suscriptor: Number(req.body.id_suscriptor),
        id_medidor : Number(req.body.id_medidor),
        id_financiacion:Number(req.body.id_financiacion)
    });
    newEnrollment.save().then((result) =>{
        if (result) {
            let newHistoricEnrollment = historicoMatriculaModel.build({
                id_historico_matricula: null,
                fecha_operacion: new Date(),
                tipo_operacion:'Adjudicada',
                id_matricula:result.id_matricula
            });
            newHistoricEnrollment.save().then((historicResult) =>{
                if (historicResult) {
                    res.status(200).json({ok: true, message: 'La matricula ha sido agregada correctamente con el ID: ' + result.id_matricula, result:result.id_matricula});
                }else{
                    res.status(500).json({ok: false, message: 'Error al agregar la matricula', error: err});
                }
            });
        }   
    }).catch((err) =>{
        res.status(500).json({ok: false, message: 'Error al conectarse a la DB', error: err});
    });
}); 

//modificar matricula: predio, suscriptor, estado, tipo de servicio,id medidor
 matriculaController.post('/updateEnrollment', [JWTokenVerification], (req, res) => {
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
            result.save().then((result) => {
                if (result) {
                    let newHistoricEnrollment = historicoMatriculaModel.build({
                        id_historico_matricula: null,
                        fecha_operacion: new Date(),
                        tipo_operacion:result.estado_matricula,
                        id_matricula:result.id_matricula
                    });
                    newHistoricEnrollment.save().then((historicResult) =>{
                        if (historicResult) {
                            res.status(200).json({ok: true, message: 'Los datos de la matricula han sido modificados correctamente'});
                        }else{
                            res.status(500).json({ok: false, message: 'Error al agregar la matricula', error: err});
                        }
                    });
                }  
                
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
matriculaController.get('/getAll',[JWTokenVerification], (req, res) => {
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

// obtener todas las matriculas de un predio --> sin consumir
matriculaController.get('/getEnrollmentsBySubscriber',[JWTokenVerification], (req, res) => {
    matriculaModel.findAll({
        where: {
                 id_numero_predial: req.body.id_numero_predial,
        }
    }).then((result) => {
        if (result) {
            return res.status(200).json({ok: true, result: result});
        } else {
            res.status(200).json({ok: false, message: 'El predio no existe o no tiene matriculas asignadas'});
        }
    }).catch((err) => {
        res.status(500).json({ok: false, message: 'Error al conectarse a la base de datos', error: err});
    });
});

//obtener los estados de la matricula
matriculaController.get('/getEnrollmentState',[JWTokenVerification], (req, res) => {
    let matState = ['Adjudicada','En instalacion','Activa',
    'Suspension Impuesta','Suspension temporal','Cancelada'];
    return res.status(200).json({ok: true, result: matState});
});

//buscar matricula por id--> retur numero matricula, nombre_suscriptor
matriculaController.get('/getEnrollmentByID/:id_enrollment',[JWTokenVerification], (req, res) => {
    const query = 'CALL get_enrollment_dates_by_id(:id_matricula)';
    matriculaModel.sequelize.query(
        query,
        {type: QueryTypes.select,
        replacements:{id_matricula: req.params.id_enrollment}
        }).then((result) =>{
        return res.status(200).json({ok: true, result: result});
    }).catch((err) => {
        return res.status(400).json({ok: false, message: 'Error al conectarse a la base de datos', err: err});
    })
});

module.exports = {matriculaController};