const express = require('express');
const destinoEconomicoController = express();
const {JWTokenVerification} = require('../middleware/Authentication');

// obtener una matricula
destinoEconomicoController.get('/getdestEconomico', (req, res) => {
    let destino = ['Habitacional','Industrial','Comercial',
    'Agropecuario','Minero','Cultural','Recreacional',
    'Salubridad','Institucional o Estado','Mixto','Otros'];
    return res.status(200).json({ok: true, result: destino});
});

module.exports = {destinoEconomicoController};