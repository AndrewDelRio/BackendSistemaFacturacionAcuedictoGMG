const express = require('express');
const globalController = express();
const {loginController} = require('./LoginController');
const {suscriptorController} = require('./SuscriptoresController');
const {matriculaController} = require('./MatriculasController');

globalController.use(loginController);
globalController.use(suscriptorController);
globalController.use(matriculaController);

module.exports = {globalController};