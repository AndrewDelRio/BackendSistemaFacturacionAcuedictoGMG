const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'Historicos_medidor';
const options = {};
const attributes = {
    id_historico_medidor:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    lectura_anterior_medidor:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    fecha_lectura_anterior:{
        type: DataTypes.DATETIME,
        allowNull:false
    },
    lectura_actual_medidor:{
        type: DataTypes.FLOAT,
        allowNull:false
    },
    fecha_toma_lectura_actual:{
        type: DataTypes.DATETIME,
        allowNull:false
    },
    total_consumo_medidor:{
        type: DataTypes.FLOAT,
        allowNull:false
    },
    id_medidor:{
        type: DataTypes.BIGINT,
        allowNull:false
    }
};
const historicoMedidorModel = sequelize.define(tableName, attributes,options);
module.exports = {historicoMedidorModel};