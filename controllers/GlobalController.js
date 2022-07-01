const express = require('express');
const globalController = express();
const {loginController} = require('./LoginController');

globalController.use(loginController);

module.exports = {globalController};