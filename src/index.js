require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const morgan = require("morgan"); //dev
//const config = require('./configs/config')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// DB Config
require("./database/config").dbConnection();

// App de Express
const app = express();

// Lectura y parseo del Body
app.use(express.json());
app.use(cors());
app.use(morgan("dev")); //dev

// Node Server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require("./sockets/socket");

// Path público
// const publicPath = path.resolve(__dirname, 'public');
// app.use(express.static(publicPath));

// Mis Rutas
//app.use("/api/matriculacion", require("./routes/ruta"));
app.use("/api/login", require("./routes/auth"));
app.use("/api/generales", require("./routes/generalesRoutes"));
app.use("/api/sao", require("./routes/saoRoutes"));
app.use("/api/version", require("./routes/version"));

//settings
//app.set('port', process.env.PORT || config.PORT);
app.set("json spaces", 2);

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log("Servidor corriendo en puerto", process.env.PORT);
});

/**
 * ?ver como mandar el token por header en la peticion de angular
 * 
 */