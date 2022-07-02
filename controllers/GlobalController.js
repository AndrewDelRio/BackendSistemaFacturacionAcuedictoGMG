const express = require('express');
const globalController = express();
const {loginController} = require('./LoginController');
const {suscriptorController} = require('./SuscriptoresController');
const {matriculaController} = require('./MatriculasController');
const {predioController} = require('./PredioController');
const{destinoEconomicoController} = require('./DestinoEconomicoController');
const {lugarController} = require('./LugarController');

globalController.use(loginController);
globalController.use(suscriptorController);
globalController.use(matriculaController);
globalController.use(predioController);
globalController.use(destinoEconomicoController);
globalController.use(lugarController);

module.exports = {globalController};