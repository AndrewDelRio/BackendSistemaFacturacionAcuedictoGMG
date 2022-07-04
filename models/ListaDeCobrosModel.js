const {sequelize} = require('../database/databaseDriver');
const {DataTypes} = require('sequelize');

const tableName = 'Lista_de_cobros';
const options = {};
const attributes = {
    id_lista_de_cobro:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true
    },
    id_cobro:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_matricula:{
        type: DataTypes.INT,
        allowNull:false
    },
    fecha_cobro:{
        type: DataTypes.DATE,
        allowNull:false
    },
    cantidad_unidades:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    observaciones:{
        type: DataTypes.STRING(2000),
        allowNull:true
    }
};
const listaDeCobroModel = sequelize.define(tableName, attributes,options);
module.exports = {listaDeCobroModel};