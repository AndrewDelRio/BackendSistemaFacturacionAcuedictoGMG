const express = require('express');
const globalController = express();
const {loginController} = require('./LoginController');
const {suscriptorController} = require('./SuscriptoresController');
const {matriculaController} = require('./MatriculasController');
const {predioController} = require('./PredioController');

globalController.use(loginController);
globalController.use(suscriptorController);
globalController.use(matriculaController);
globalController.use(predioController);

module.exports = {globalController};