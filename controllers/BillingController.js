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
billingController.post('/getPaidInvoices',[JWTokenVerification],(req, res) =>{
    const facturas = req.body.payment_list;
    if (facturas.length != 0) {
        let counterUpdatesInvoices = 0;
        const query = 'CALL update_invoice(:id_factura)';
        facturas.map(function(factura) { 
        facturaModel.sequelize.query(query,
            {type: QueryTypes.UPDATE,
                replacements:{id_factura:factura}
            }).then((result) =>{
                counterUpdatesInvoices++;
                if (counterUpdatesInvoices === facturas.length) {
                    return res.status(200).json({ok:true, message: 'Registros actualizados'});
                }
            }).catch((err) => {
                res.status(400).json({ok: false, err:err, message: 'Error al conectarse a la base de datos'});
            })
        })
    }else{
        return res.status(400).json({ok: true, message: 'Todas las facturas no fueron pagadas'});
    }  
})

//obtener fecha estructurada del ultimo periodo de facturacion
billingController.get('/getDateFromLastPeriod',[JWTokenVerification],(req, res) => {
    facturaModel.sequelize.query('SELECT get_date_from_last_period() as dateLastPeriod').then((result) =>{
        return res.status(200).json({ok: true, result: result[0]});
    }).catch((err) => {
        return res.status(400).json({ok: false, message: 'Error al conectarse a la base de datos', err: err});
    })
    
});

module.exports = {billingController};

