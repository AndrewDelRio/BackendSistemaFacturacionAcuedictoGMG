const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'Facturas';
const options = {};
const attributes = {
    id_factura:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    valor_total_factura:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    estado_factura:{
        type: DataTypes.BOOLEAN,
        allowNull:false
    },
    periodo_factura_emitida:{
        type: DataTypes.STRING(20),
        allowNull:false
    },
    referencia_pago_factura: {
        type: DataTypes.BIGINT,
        allowNull:false
    },
    fecha_emision_factura:{
        type: DataTypes.DATE,
        allowNull:false
    },
    fecha_pago_factura:{
        type: DataTypes.DATE,
        allowNull:true
    },
    valor_pagado_factura:{
        type: DataTypes.DOUBLE,
        allowNull:true
    },
    fecha_maxima_pago_factura:{
        type: DataTypes.DATE,
        allowNull:false
    },
    id_matricula:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    id_periodo:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
};
const facturaModel = sequelize.define(tableName, attributes,options);
module.exports = {facturaModel};