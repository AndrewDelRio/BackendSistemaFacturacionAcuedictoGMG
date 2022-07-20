const express = require('express');
const billingController = express();
const {facturaModel} = require('../models/FacturaModel');
const {JWTokenVerification} = require('../middleware/Authentication');
const { QueryTypes } = require('@sequelize/core');

//obtener facturas del ultimo periodo
billingController.get('/getInvoiceLastPeriod',[JWTokenVerification], (req, res) => {
    facturaModel.sequelize.query('CALL get_invoice_by_billing_period(get_last_billing_period())').then((result) =>{
        return res.status(200).json({ok: true, result: result});
    }).catch((err) => {
        return res.status(400).json({ok: false, message: 'Error al conectarse a la base de datos', err: err});
    })
    
});
//recibir facturas que se pagaron
billingController.post('/getUnpaidInvoices',[JWTokenVerification],(req, res) =>{
    const facturas = req.body.payment_list;
    if (facturas.length != 0) {
        const query = 'CALL update_invoice(:id_factura)';
        facturas.map(function(factura) { 
        facturaModel.sequelize.query(query,
            {type: QueryTypes.UPDATE,
                replacements:{id_factura: Number(factura)}
            }).then((result) =>{
                return res.status(200).json({ok:true, result:result,message: 'Registros actualizados'});
            })
        })
    }else{
        return res.status(400).json({ok: false, message: 'No se encontraron registros para actualizar'});
    }
    
})

module.exports = {billingController};

