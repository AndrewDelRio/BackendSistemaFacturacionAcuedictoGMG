const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'Tipos_de_servicio';
const options = {};
const attributes = {
    id_tipo_de_servicio:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    nombre_servicio:{
        type: DataTypes.STRING(20),
        allowNull: false
    },
    abreviatura_servicio:{
        type: DataTypes.STRING(3),
        allowNull:false
    },
    valor_servicio_tarifa_fija:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    valor_servicio_tarifa_variable:{
        type: DataTypes.DOUBLE,
        allowNull:false
    }
};
const tipoDeServicioModel = sequelize.define(tableName, attributes,options);
module.exports = {tipoDeServicioModel};