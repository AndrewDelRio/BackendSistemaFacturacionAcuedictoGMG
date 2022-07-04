const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'Lugares';
const options = {};
const attributes = {
    id_lugar:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false
    },
    nombre_lugar:{
        type: DataTypes.STRING(45),
        allowNull:false
    },
    abreviatura_lugar:{
        type: DataTypes.STRING(5),
        allowNull:false
    },
    tipo_lugar:{
        type: DataTypes.STRING(3),
        allowNull:false
    },
    id_ubicacion:{
        type: DataTypes.INTEGER,
        allowNull:true
    }
}

const lugarModel = sequelize.define(tableName, attributes,options);
module.exports = {lugarModel};
