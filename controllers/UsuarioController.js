const express = require('express');
const userController = express();
const { Op } = require("sequelize");
const {userModel} = require('../models/UsuariosModels');
const {JWTokenVerification} = require('../middleware/Authentication');
const { QueryTypes } = require('@sequelize/core');


// actualizar datos de contacto del usuario
userController.post('/updateUserContactDates',[JWTokenVerification], (req, res) => {
    userModel.findOne({
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

//actualizar contrasenia del usuario
userController.post('/updatePasswordUser', (req, res) => {
    const id_usuario = 0;
    const new_password = "";
    const query = "SELECT update_password_user(:id_usuario,:new_password) AS update_password";
    userModel.sequelize.query(query,{
        type: QueryTypes.select,
        replacements:{id_usuario: req.body.id_usuario,
        new_password : req.body.new_password}
    }).then((result) =>{
        return res.status(200).json({ok: true, result: result[0]});
    });
});

module.exports = {userController};