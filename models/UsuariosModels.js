const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'Usuarios';
const options = {};
const attributes = {
    id_usuario:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false
    },
    apellidos_usuario:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    nombres_usuario:{
        type: DataTypes.STRING(45),
        allowNull:false
    },
    correo_personal_usuario:{
        type: DataTypes.STRING(45),
        allowNull:false
    },
    correo_acceso_usuario:{
        type: DataTypes.STRING(45),
        allowNull:false
    },
    contrasenia_acceso_usuario:{
        type: DataTypes.TEXT,
        allowNull:false
    },
    telefono_usuario:{
        type: DataTypes.STRING(10),
        allowNull:false
    },
    id_rol:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    id_tipo_de_documento:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
};
const userModel = sequelize.define(tableName, attributes,options);
module.exports = {userModel};