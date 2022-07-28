'use strict'
const express = require('express');
const emailSenderController = express();
const emailSenderModel = require('../email/EmailSenderModel');
const {JWTokenVerification} = require('../middleware/Authentication');

emailSenderController.get('/sendEmail',[JWTokenVerification], (req, res) =>{
    emailSenderModel.enviarEmail();
});


module.exports = {emailSenderController};