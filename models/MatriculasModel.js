const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'Matriculas';
const options = {};
const attributes = {
    id_matricula:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    fecha_adjudicacion:{
        type: DataTypes.DATE,
        allowNull: true
    },
    estado_matricula:{
        type: DataTypes.STRING(4),
        allowNull:false
    },
    id_tipo_de_servicio:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    id_numero_predial:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    id_suscriptor:{
        type: DataTypes.BIGINT,
        allowNull:false
    },
    id_medidor:{
        type:DataTypes.BIGINT,
        allowNull:true
    },
    id_financiacion:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
};
const matriculaModel = sequelize.define(tableName, attributes,options);
module.exports = {matriculaModel};