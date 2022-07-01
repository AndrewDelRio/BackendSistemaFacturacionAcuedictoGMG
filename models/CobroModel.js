const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'Cobros';
const options = {};
const attributes = {
    id_cobro:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    tipo_cobro:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    concepto_cobro:{
        type: DataTypes.STRING(300),
        allowNull:false
    },
    valor_cobro:{
        type: DataTypes.DOUBLE,
        allowNull:false
    }
};
const cobroModel = sequelize.define(tableName, attributes,options);
module.exports = {cobroModel};