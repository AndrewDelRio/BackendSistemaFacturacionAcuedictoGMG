const express = require('express');
//inicializaciones
const app = express();
const {server} = require('./server/server');
const {sequelize} = require('./database/databaseDriver');
const bodyParser = require('body-parser');
const cors = require('cors');

sequelize.authenticate().then(() => {
    console.log('DB is connected');
}).catch((err) =>{
    console.log(err);
    console.log('Error al conectar con la DB')
});
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
//middleware
const morgan = require('morgan');
app.use(morgan('dev'));
const path = require('path');
app.use(server);
//settings
app.set('port', process.env.PORT || 4000);
//Public
app.use(express.static(path.join(__dirname, 'public')))
//Starting server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
})
//routes