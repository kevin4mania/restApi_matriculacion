const Metodo = require("../models/metodos");
const { Types } = require("mongoose");

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
        console.log("Info del require del usuario->", { idUsuario: Types.ObjectId(usuarioREQ), nombreMetodo, estado: true });
        const metodoBDD = await Metodo.find({ idUsuario: Types.ObjectId(usuarioREQ), nombreMetodo, estado: true });
        console.log("Busqueda de la bdd si tiene acceso-->", metodoBDD);

        if (!metodoBDD || metodoBDD.length == 0) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no tiene acceso al metodo",
            });
        } else {
            next();
        }
    } catch (error) {
        return res.status(403).json({
            msg: "0010",
            ok: false,
            msg: "Usuario no valido",
            error
        });
    }
};

module.exports = {
    validaAccesoUsuario,
};