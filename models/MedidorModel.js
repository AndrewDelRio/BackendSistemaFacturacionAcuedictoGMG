const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'Medidores';
const options = {};
const attributes = {
    id_medidor:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false
    },
    marca_medidor:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    porcentaje_calibracion:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    fecha_calibracion:{
        type: DataTypes.DATE,
        allowNull:false
    }
};
const medidorModel = sequelize.define(tableName, attributes,options);
module.exports = {medidorModel};