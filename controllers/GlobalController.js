const express = require('express');
const globalController = express();
const {loginController} = require('./LoginController');
const {suscriptorController} = require('./SuscriptoresController');

globalController.use(loginController);
globalController.use(suscriptorController);

module.exports = {globalController};