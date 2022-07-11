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
const{tipoDeDocumentoController} = require('./TiposDeDocumentoController');
const {userController} = require('./UsuarioController');
const{financiacingController} = require('./FinanciacionesController');

globalController.use(loginController);
globalController.use(suscriptorController);
globalController.use(matriculaController);
globalController.use(predioController);
globalController.use(destinoEconomicoController);
globalController.use(lugarController);
globalController.use(tipoDeServicioController);
globalController.use(medidorController);
globalController.use(tipoDeDocumentoController);
globalController.use(userController);
globalController.use(financiacingController);

module.exports = {globalController};