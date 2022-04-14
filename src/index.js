require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const morgan = require("morgan"); //dev
//const config = require('./configs/config')
const fs = require("fs");
const util = require("util");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// DB Config
require("./database/config").dbConnection();

// App de Express
const app = express();

// Lectura y parseo del Body
app.use(cors());
app.use(express.json());
//**LOG1 */
var log_file = fs.createWriteStream(__dirname + "/node.log", { flags: "a" });
app.use(morgan({ stream: log_file }));
// error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     console.log("ERR1**>", err.stack);
//     console.log("ERR2**>", err);
//     console.log("RES-->", res);
//     console.log("REQ-->", req);
//     res.locals.message = err.message;
//     res.locals.error = req.app.get("env") === "development" ? err : {};

//     // Escribimos el error
//     log_file.write(err.stack);
//     // render the error page
//     res.status(err.status || 500);
//     res.render("error");
// });
// console.log("Process-->", process.stdout);
/*
let f = (err, req, res, next) => {
    // set locals, only providing error in development
    console.log("ERR1**>", err.stack);
    console.log("ERR2**>", err);
    console.log("RES-->", res);
    console.log("REQ-->", req);
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // Escribimos el error
    // log_file.write(err.stack);
    log_file.write(err.message);

    // render the error page
    res.status(err.status || 500);
    res.render("error");
}
*/
// app.use(morgan('dev'));
//********************************************* */

// var log_file2 = fs.createWriteStream(__dirname + "/node2.log", { flags: "w" });
// var log_stdout = process.stdout;
// console.log(function(d) {
//     log_file2.write(util.format(d) + "\n");
//     log_stdout.write(util.format(d) + "\n");
// });
//******************************************** */
app.use(morgan("dev")); //dev
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Node Server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require("./sockets/socket");

// Path público
// const publicPath = path.resolve(__dirname, 'public');
// app.use(express.static(publicPath));

// Mis Rutas
//app.use("/api/matriculacion", require("./routes/ruta"));
app.use("/api/login", require("./routes/userRoutes"));
app.use("/api/informacion", require("./routes/informacionRoutes"));
app.use("/api/metodos", require("./routes/metodosRoutes"));
app.use("/api/generales", require("./routes/generalesRoutes"));
app.use("/api/sao", require("./routes/saoRoutes"));
app.use("/api/matriculacion", require("./routes/matriculacionRoutes"));
app.use("/api/rtv", require("./routes/rtvRoutes"));
app.use("/api/mail", require("./routes/apiMailRoutes"));

//settings
//app.set('port', process.env.PORT || config.PORT);
app.set("json spaces", 2);

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log("Servidor corriendo en puerto", process.env.PORT);
});

/**
 *
 */