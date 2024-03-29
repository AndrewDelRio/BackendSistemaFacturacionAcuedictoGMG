const express = require("express");
const { Op } = require("sequelize");
const loginController = express();
const { userModel } = require("../models/UsuariosModels");
const jwt = require("jsonwebtoken");
const sha256 = require("sha256");

//funcion de login del sistema
loginController.post("/login", (req, res) => {
  let condition = {
    where: {
      correo_acceso_usuario: req.body.email,
    },
  };
  userModel
    .findOne(condition)
    .then((result) => {
      if (!result) {
        return res.status(200).json({
          ok: false,
          error: "No encontrado",
          message: `El correo ${req.body.email} no esta registrado`,
        });
      } else {
          var contrasenia = sha256(req.body.password);
          let state = contrasenia === result.contrasenia_acceso_usuario;
          if (!state) {
            return res.status(200).json({
              ok: false,
              error: "Contraseña erronea",
              message: "La contraseña no corresponde a la registrada",
            });
          } else {
            let token = jwt.sign({ user: result }, process.env.JWT_SIGNATURE, {
              expiresIn: process.env.JWT_EXP_TIME,
            });
            return res.status(200).json({
              ok: true,
              token: token,
              message: {username:result.nombres_usuario, id_user: result.id_usuario, id_rol : result.id_rol}
            });
          }
      }
    })
    .catch((err) => {
      return res.status(500).json({
        ok: false,
        error: err,
        message: `Ocurrio un error al conectarse a la base de datos`,
      });
    });
});

module.exports = { loginController };
