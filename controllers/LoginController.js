const express = require('express');
const { Op } = require("sequelize");
const loginController = express();
const {userModel} = require('../models/UsuariosModels');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

loginController.post('/login', (req, res) => {
    let condition = {
        where: {
            correo_acceso_usuario: req.body.email
        }
    };
    userModel.findOne(condition).then((result) => {
        console.log(req.body.password);
        console.log(result.contrasenia_acceso_usuario);
        if (!result) {
            return res.status(404).json({
                ok: false,
                error: "No encontrado",
                message: `El correo ${req.body.email} no esta registrado`
            });
        } else { 
            if (!bcrypt.compareSync(req.body.password, result.contrasenia_acceso_usuario)) {
                return res.status(400).json({
                    ok: false,
                    error: "Contraseña erronea",
                    message: "La contraseña no corresponde a la registrada"
                });
            } else {
                let token = jwt.sign({ user: result}, process.env.JWT_SIGNATURE, {
                    expiresIn: process.env.JWT_EXP_TIME,
                });
                return res.status(200).json({
                    ok: true,
                    token: token,
                    message: result.nombres_usuario
                });
            }
        }
    }).catch((err) => {
        return res.status(500).json({
            ok: false,
            error: err,
            message: `Ocurrio un error al conectarse a la base de datos`
        });
    });
});

module.exports = {loginController};