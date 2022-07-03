const express = require('express');
const suscriptorController = express();
const { Op } = require("sequelize");
const {suscriptorModel} = require('../models/TiposDeDocumento');
const {JWTokenVerification} = require('../middleware/Authentication');



