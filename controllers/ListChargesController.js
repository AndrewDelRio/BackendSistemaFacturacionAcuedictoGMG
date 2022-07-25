const express = require('express');
const listChargesController = express();
const {listaDeCobroModel} = require('../models/ListaDeCobrosModel');
const {JWTokenVerification} = require('../middleware/Authentication');
const { QueryTypes } = require('@sequelize/core');

// agregar las sanciones a las matriculas
listChargesController.post('/registerChargesList',[JWTokenVerification], (req, res) => {
    const cobrosList = req.body.charges;
    if (cobrosList.length != 0) {
        let counterUpdatesCharges = 0;
        const query = 'CALL register_charges_and_penalties(:id_cobro,:id_matricula,:fecha_cobro,:cantidad_unidades,:observaciones)';
        cobrosList.map(function(cobro) { 
            listaDeCobroModel.sequelize.query(query,
                {type: QueryTypes.INSERT,
                    replacements:{id_cobro:cobro.id_payment, id_matricula:cobro.id_enrollment,fecha_cobro:new Date(),cantidad_unidades: cobro.quantity, observaciones: cobro.observations}
                }).then((result) =>{
                    counterUpdatesCharges++;
                    if (counterUpdatesCharges === cobrosList.length) {
                        return res.status(200).json({ok:true, message: 'Cobros registrados exitosamente'});
                    }
                }).catch((err) => {
                    return res.status(400).json({ok: false, err:err, message: 'Error al conectarse a la base de datos'});
                })
        })
    }else{
        return res.status(200).json({ok: true, message: 'No existen registros para actualizar'});
    }
});

module.exports = {listChargesController};