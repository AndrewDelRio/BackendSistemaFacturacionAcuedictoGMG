const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'Roles';
const options = {};
const attributes = {
    id_rol:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    nombre_rol:{
        type: DataTypes.STRING(30),
        allowNull:false
    },
    abreviatura_rol:{
        type: DataTypes.STRING(3),
        allowNull:false
    }
}

const rolModel = sequelize.define(tableName, attributes,options);
module.exports = {rolModel};
