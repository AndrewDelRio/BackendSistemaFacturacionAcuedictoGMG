const dbUserName = 'u3ahcytcf7lihogl';
const dbPassword = 'Yz6ki9YrKxb3GNI1JD8';
const dbName = 'bwbrypxrn7int2l8ynid';
const dBHost = 'bwbrypxrn7int2l8ynid-mysql.services.clever-cloud.com';
const dBPort = '20954';

process.env.JWT_SIGNATURE = process.env.JWT_SIGNATURE || 'developmenttokensignature';
process.env.JWT_EXP_TIME = process.env.JWT_EXP_TIME || '10h';

module.exports = {dbUserName,dbPassword,dbName,dBHost,dBPort};