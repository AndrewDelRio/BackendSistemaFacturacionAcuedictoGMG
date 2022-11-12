const dbUserName = 'ufz1wimlrdorjkgn';
const dbPassword = 'fxbDx44LeLmpJW9qf0rq';
const dbName = 'be3ecb62hjw6d2ksplo1';
const dBHost = 'be3ecb62hjw6d2ksplo1-mysql.services.clever-cloud.com';
const dBPort = '3306';

process.env.JWT_SIGNATURE = process.env.JWT_SIGNATURE || 'developmenttokensignature';
process.env.JWT_EXP_TIME = process.env.JWT_EXP_TIME || '10h';

module.exports = {dbUserName,dbPassword,dbName,dBHost,dBPort};