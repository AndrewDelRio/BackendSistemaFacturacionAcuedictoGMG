const {Sequelize} = require('sequelize');
const {dbUserName,dbPassword,dbName,dBHost,dBPort} = require('../config/config');

const sequelize = new Sequelize(dbName, dbUserName,dbPassword,{
    host: dBHost,
    dialect: 'mysql',
    port: dBPort,
    logging: false,
  define: {
    freezeTableName: true,
    timestamps: false
  }
});
module.exports = {sequelize};