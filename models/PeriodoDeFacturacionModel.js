const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'Periodos_de_facturacion';
const options = {};
const attributes = {
    id_periodo:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    fecha_inicial_periodo:{
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_final_periodo:{
        type: DataTypes.DATE,
        allowNull:false
    },
    tipo_facturacion:{
        type: DataTypes.BOOLEAN,
        allowNull:false
    }
};
const periodoDeFacturacionModel = sequelize.define(tableName, attributes,options);
module.exports = {periodoDeFacturacionModel};