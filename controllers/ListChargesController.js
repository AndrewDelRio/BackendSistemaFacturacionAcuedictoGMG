const express = require('express');
const listChargesController = express();
const {listaDeCobroModel} = require('../models/ListaDeCobrosModel');
const {JWTokenVerification} = require('../middleware/Authentication');
const { QueryTypes } = require('@sequelize/core');

// agregar las sanciones a las matriculas
listChargesController.post('/registerChargesList',/**[JWTokenVerification],**/ (req, res) => {
    const cobrosList = req.body.charge_list;
    console.log(cobrosList.length);
    const query = 'CALL register_charges_and_penalties(:id_cobro,:id_matricula,:fecha_cobro,:cantidad_unidades,:observaciones)';
        listaDeCobroModel.sequelize.query(query,
            {type: QueryTypes.INSERT,
                replacements:{id_cobro:cobrosList.id_payment, id_matricula:cobrosList.id_enrollment,fecha_cobro:new Date(),cantidad_unidades: cobrosList.quantity, observaciones: cobrosList.observations}
            }).then((result) =>{
                    return res.status(200).json({ok:true, message: 'Cobros registrados exitosamente'});
            }).catch((err) => {
                res.status(400).json({ok: false, err:err, message: 'Error al conectarse a la base de datos'});
            })
});

module.exports = {listChargesController};