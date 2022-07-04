const {sequelize} = require('./databaseDriver');
const {cobroModel} = require('../models/CobroModel');
const {facturaModel} = require('../models/FacturaModel');
const {financiacionModel} = require('../models/FinanciacionesModel');
const {historicoPagoMatriculaModel} = require('../models/HistoricoPagoMatricula');
const {historicoMatriculaModel} = require('../models/HistoricosMatricula');
const {historicosMedidorModel} = require('../models/HistoricosMedidorModel');
const {listaDeCobrosModel} = require('../models/ListaDeCobrosModel');
const {lugaresModel} = require('../models/LugaresModel');
const {matriculasModel} = require('../models/MatriculasModel');
const {medidoresModel} = require('../models/MedidorModel');
const {periodoDeFacturacionModel} = require('../models/PeriodoDeFacturacionModel');
const {prediosModel} = require('../models/PrediosModel');
const {rolesModel} = require('../models/RolesModel');
const {suscriptorModel} = require('../models/SuscriptorModel');
const {tiposDeDocumentoModel} = require('../models/TiposDeDocumento');
const {tiposDeServicioModel} = require('../models/TiposDeServicioModel');
const {usuariosModel} = require('../models/UsuariosModels');

function rebuild(){
    return new Promise(async (resolve,reject) =>{
        try {
            await sequelize.sync({alter:true}).then(() =>{
                console.log('All the tables rebuild');
                resolve(true);
            })
        } catch (error) {
            reject(error);
        }
    });
}

rebuild().then(() =>{
    sequelize.close();
}).catch((err) =>{
    console.error(err);
})