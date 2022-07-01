const express = require('express');
const server = express();
const {globalController} = require('../controllers/GlobalController');

server.use(globalController);
module.exports = {server};