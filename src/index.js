const express = require('express');
const path = require('path');
require('dotenv').config();
//const config = require('./configs/config')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

// DB Config
require('./database/config').dbConnection();

// App de Express
const app = express();

// Lectura y parseo del Body
app.use(express.json());


// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// Path público
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// Mis Rutas
app.use('/api/matriculacion', require('./routes/ruta'));

//settings
//app.set('port', process.env.PORT || config.PORT);
app.set('json spaces', 2)
app.use(cors())



server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Servidor corriendo en puerto', process.env.PORT);
});