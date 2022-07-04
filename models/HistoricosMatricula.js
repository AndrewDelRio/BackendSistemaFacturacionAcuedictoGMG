const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'Historicos_matricula';
const options = {};
const attributes = {
    id_historico_matricula:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    fecha_operacion:{
        type: DataTypes.DATE,
        allowNull:false
    },
    tipo_operacion:{
        type: DataTypes.STRING(5),
        allowNull:false
    },
    id_matricula:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
};
const historicoMatriculaModel = sequelize.define(tableName, attributes,options);
module.exports = {historicoMatriculaModel};