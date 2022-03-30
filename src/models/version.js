const { Types } = require("mongoose");
const Metodo = require("./metodos");
const Usuario = require("./usuario");

const version = async(req, res) => {
    const datos = {
        name: "Api to MATRICULACION",
        website: "MATRICULACION-AMT",
        "v1.0": "2022-03-21",
    };
    res.json(datos);
};

const metodosConacceso = async(req, res) => {
    try {
        // const { idUsuario } = req.params;
        const usuarioREQ = req.usuario;
        const usuarioBDD = await Usuario.find({ _id: Types.ObjectId(usuarioREQ) });
        // console.log("usuario->", usuarioBDD);
        // console.log(req);
        // console.log("IdUsuario--><<<", usuarioREQ);
        // console.log({ idUsuario: Types.ObjectId(idUsuario), estado: true });
        const metodoBDD = await Metodo.find({ idUsuario: Types.ObjectId(usuarioREQ), estado: true });
        if (!metodoBDD || metodoBDD.length == 0) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no tiene metodos asignados",
            });
        }
        res.json({
            ok: true,
            usuario: { nombre: usuarioBDD[0].nombre, email: usuarioBDD[0].email },
            metodosAcceso: metodoBDD,
        });
    } catch (error) {
        return res.status(403).json({
            msg: "0010",
            ok: false,
            msg: "Error hable con el administrador",
            error,
        });
    }
};

const buscaMetodosConAccesoID = async(req, res) => {
    try {
        const { IdUsuario } = req.params;
        const usuarioBDD = await Usuario.find({ _id: Types.ObjectId(IdUsuario) });
        const metodoBDD = await Metodo.find({ idUsuario: Types.ObjectId(IdUsuario), estado: true });
        if (!metodoBDD || metodoBDD.length == 0) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no tiene metodos asignados",
            });
        }
        res.json({
            ok: true,
            usuario: { nombre: usuarioBDD[0].nombre, email: usuarioBDD[0].email },
            metodosAcceso: metodoBDD,
        });
    } catch (error) {
        return res.status(403).json({
            msg: "0010",
            ok: false,
            msg: "Error hable con el administrador",
            error,
        });
    }
};

module.exports = {
    version,
    metodosConacceso,
    buscaMetodosConAccesoID,
};