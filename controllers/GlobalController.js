const express = require('express');
const globalController = express();
const {loginController} = require('./LoginController');
const {suscriptorController} = require('./SuscriptoresController');
const {matriculaController} = require('./MatriculasController');
const {predioController} = require('./PredioController');
const{destinoEconomicoController} = require('./DestinoEconomicoController');
const {lugarController} = require('./LugarController');
const {tipoDeServicioController} = require('./TiposDeServicioController');
const {medidorController} = require('./MedidoresController');

globalController.use(loginController);
globalController.use(suscriptorController);
globalController.use(matriculaController);
globalController.use(predioController);
globalController.use(destinoEconomicoController);
globalController.use(lugarController);
globalController.use(tipoDeServicioController);
globalController.use(medidorController);

module.exports = {globalController};