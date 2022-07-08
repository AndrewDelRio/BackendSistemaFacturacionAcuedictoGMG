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

//
/**
 * actualizar contrasenia del usuario
 *  RETURN 0 --> Clave nueva y clave anterior de la base de datos son iguales
    RETURN 1 --> Contrasenia actual coincide con la registrada en el sistema y la actualiza
    RETURN 2 --> Contrasenia no coincide con la del sistema
 */
userController.post('/updatePasswordUser', (req, res) => {
    const idUsuario = 0;
    const actualPassword = "";
    const newPassword = "";
    const query = "SELECT update_password_user(:idUsuario,:actualPassword,:newPassword) AS update_password";
    userModel.sequelize.query(query,{
        type: QueryTypes.select,
        replacements:{
            idUsuario: req.body.id_usuario,
            actualPassword: req.body.actual_password,
            newPassword : req.body.new_password,
    },
    }).then((result) =>{
        return res.status(200).json({ok: true, message: result[0]});
    });
});

module.exports = {userController};