const Metodo = require("./metodos");
const { Types } = require("mongoose");

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
        const { idUsuario } = req.params;
        const { usuarioREQ } = req.usuario;
        // console.log(req);
        console.log("IdUsuario--><<<", usuarioREQ);
        // console.log({ idUsuario: Types.ObjectId(idUsuario), estado: true });
        const metodoBDD = await Metodo.find({ idUsuario: Types.ObjectId(usuarioREQ), estado: true });
        // console.log("Resultado de la bsuqueda en la base-->", metodoBDD);

        if (!metodoBDD || metodoBDD.length == 0) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no tiene acceso al metodo",
            });
        }
        res.json({
            ok: true,
            metodoBDD,
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
};