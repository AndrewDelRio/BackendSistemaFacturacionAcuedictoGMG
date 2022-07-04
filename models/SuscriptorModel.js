const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'Suscriptores';
const options = {};
const attributes = {
    id_suscriptor:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull:false
    },
    primer_apellido_suscriptor:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    segundo_apellido_suscriptor:{
        type: DataTypes.STRING(45),
        allowNull:true
    },
    primer_nombre_suscriptor:{
        type: DataTypes.STRING(45),
        allowNull:false
    },
    segundo_nombre_suscriptor:{
        type: DataTypes.STRING(45),
        allowNull:true
    },
    fecha_nacimiento_suscriptor:{
        type: DataTypes.DATE,
        allowNull:true
    },
    direccion_suscriptor:{
        type: DataTypes.STRING(45),
        allowNull:true
    },
    correo_electronico_suscriptor:{
        type: DataTypes.STRING(100),
        allowNull:true
    },
    telefono_suscriptor:{
        type: DataTypes.STRING(10),
        allowNull:true
    },
    id_tipo_de_documento:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
};
const suscriptorModel = sequelize.define(tableName, attributes,options);
module.exports = {suscriptorModel};