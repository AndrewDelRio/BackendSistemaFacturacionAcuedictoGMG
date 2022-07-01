const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'Tipos_de_documento';
const options = {};
const attributes = {
    id_tipo_de_documento:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false, 
        autoIncrement:true
    },
    nombre_tipo_de_documento:{
        type: DataTypes.STRING(45),
        allowNull:false
    },
    abreviatura_tipo_de_documento:{
        type: DataTypes.STRING(3),
        allowNull:false
    }
}

const tipoDeDocumentoModel = sequelize.define(tableName, attributes,options);
module.exports = {tipoDeDocumentoModel};
