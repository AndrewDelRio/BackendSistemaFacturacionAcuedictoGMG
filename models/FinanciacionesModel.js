const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'Financiaciones';
const options = {};
const attributes = {
    id_financiacion:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    valor_financiacion:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    cuotas_financiacion:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    porcentaje_interes:{
        type: DataTypes.DOUBLE,
        allowNull:false
    }
};
const financiacionModel = sequelize.define(tableName, attributes,options);
module.exports = {financiacionModel};