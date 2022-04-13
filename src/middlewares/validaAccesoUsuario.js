const { Types } = require("mongoose");

const Metodo = require("../models/metodos");
const RegistroMetodos = require("../models/registroMetodos");
const Usuario = require("../models/usuario");

const validaAccesoUsuario = async(req, res, next) => {
    try {
        const pathURL = req.route.path.split(":");
        const baseURL = req.baseUrl;
        const usuarioREQ = req.usuario;
        let nombreMetodo = "";
        if (pathURL.length > 1) {
            nombreMetodo = baseURL + pathURL[0].substring(0, pathURL[0].length - 1);
        } else {
            nombreMetodo = baseURL + pathURL[0];
        }
        const usuarioDB = await Usuario.findOne({ _id: Types.ObjectId(usuarioREQ) });
        // console.log(usuarioDB);
        if (!usuarioDB.online) {
            return res.json({
                ok: false,
                codError: "0001",
                msg: `El usuario ${usuarioDB.email} se encuentra inactivo`
            });
        }
        // console.log("Info del require del usuario->", { idUsuario: Types.ObjectId(usuarioREQ), nombreMetodo, estado: true });
        const metodoBDD = await Metodo.find({ idUsuario: Types.ObjectId(usuarioREQ), nombreMetodo, estado: true });
        // console.log(`Nombre metodo que llega en JWT:${nombreMetodo} usuario:${usuarioREQ}`);
        // console.log("Busqueda de la bdd si tiene acceso-->", metodoBDD);
        const registroMetodoBDD = await RegistroMetodos.find({ URL: nombreMetodo, online: true });
        // console.log("Consulta registro-->", registroMetodoBDD);
        if (!metodoBDD || metodoBDD.length == 0) {
            return res.json({
                codError: "0001",
                ok: false,
                msg: "Usuario no tiene acceso a la ruta",
            });
        } else if (!registroMetodoBDD || registroMetodoBDD.length == 0) {
            return res.json({
                ok: false,
                codError: "0001",
                msg: "La ruta se encuentra inactiva",
            });
        } else {
            next();
        }
    } catch (error) {
        return res.json({
            codError: "999",
            ok: false,
            msg: "Usuario no valido",
            error
        });
    }
};

module.exports = {
    validaAccesoUsuario,
};