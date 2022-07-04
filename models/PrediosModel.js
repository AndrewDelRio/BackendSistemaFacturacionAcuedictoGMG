const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'Predios';
const options = {};
const attributes = {
    id_numero_predial:{
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull:false
    },
    numero_predial_anterior:{
        type: DataTypes.STRING(50),
        allowNull:false
    },
    direccion_predio:{
        type: DataTypes.STRING(100),
        allowNull:false
    },
    nombre_predio:{
        type: DataTypes.STRING(45),
        allowNull:false
    },
    area_predio:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    area_construccion:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    destino_economico_predio:{
        type: DataTypes.STRING(30),
        allowNull:true
    },
    id_lugar:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
}

const predioModel = sequelize.define(tableName, attributes,options);
module.exports = {predioModel};
