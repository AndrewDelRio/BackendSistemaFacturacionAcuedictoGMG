const dbUserName = 'u88cwzub9lqvg88i';
const dbPassword = 'WZB5sdt8w1gRxUcH4MWM';
const dbName = 'bpidcmf0rywnnilobkjx';
const dBHost = 'bpidcmf0rywnnilobkjx-mysql.services.clever-cloud.com';
const dBPort = '20183';

process.env.JWT_SIGNATURE = process.env.JWT_SIGNATURE || 'developmenttokensignature';
process.env.JWT_EXP_TIME = process.env.JWT_EXP_TIME || '10h';

module.exports = {dbUserName,dbPassword,dbName,dBHost,dBPort};