const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'Historicos_pago_matricula';
const options = {};
const attributes = {
    id_historico_pago_matricula:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    valor_pagado:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    fecha_pago:{
        type: DataTypes.DATE,
        allowNull:false
    },
    id_matricula:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
};
const historicoPagoMatriculaModel = sequelize.define(tableName, attributes,options);
module.exports = {historicoPagoMatriculaModel};