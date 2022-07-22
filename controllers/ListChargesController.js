const express = require('express');
const listChargesController = express();
const {listaDeCobroModel} = require('../models/ListaDeCobrosModel');
const {JWTokenVerification} = require('../middleware/Authentication');
const { QueryTypes } = require('@sequelize/core');

// agregar las sanciones a las matriculas
listChargesController.post('/registerChargesList',/**[JWTokenVerification],**/ (req, res) => {
    const query = 'CALL register_charges_and_penalties(:id_cobro,:id_matricula,:fecha_cobro,:cantidad_unidades,:observaciones)';
    let counter = 0;
    listaDeCobroModel.sequelize.query(
        query,
        {type: QueryTypes.select,
        replacements:{id_cobro: 404, id_matricula: 4,fecha_cobro : new Date(),cantidad_unidades : 2,observaciones:'Insercion desde el backend'}
        }).then((result) =>{
            //agregar contador 
        return res.status(200).json({ok: true, result: result});
    }).catch((err) => {
        return res.status(400).json({ok: false, message: 'Error al conectarse a la base de datos', err: err});
    })
});

module.exports = {listChargesController};