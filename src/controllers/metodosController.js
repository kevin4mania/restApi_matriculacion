const { Types } = require("mongoose");

const Metodo = require("../models/metodos");
const Usuario = require("../models/usuario");
const RegistroMetodos = require("../models/registroMetodos");

const consultaMetodosPorUsuario = async(req, res) => {
    try {
        const { IdUsuario } = req.params;
        const usuarioBDD = await Usuario.find({ _id: Types.ObjectId(IdUsuario) });
        if (!usuarioBDD || usuarioBDD.length == 0) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado",
            });
        }
        const metodoBDD = await Metodo.find({
            idUsuario: Types.ObjectId(IdUsuario),
            estado: true,
        });
        if (!metodoBDD || metodoBDD.length == 0) {
            return res.status(404).json({
                ok: false,
                usuario: usuarioBDD[0].email,
                msg: "Usuario no tiene metodos asignados",
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBDD[0].email,
            metodosAcceso: metodoBDD,
        });
    } catch (error) {
        return res.status(403).json({
            msg: "0010",
            ok: false,
            msg: "Error hable con el administrador",
        });
    }
};

const consultaMetodosTodosUsuarios = async(req, res) => {
    try {
        const usuarioREQ = req.usuario;
        const metodoBDD = await Metodo.find();
        if (!metodoBDD || metodoBDD.length == 0) {
            return res.status(404).json({
                ok: false,
                msg: "No existen metodos",
            });
        }
        const agrupado = await Metodo.aggregate(
            [{
                $group: {
                    _id: "$idUsuario",
                    metodos: {
                        $addToSet: { nombre: "$nombreMetodo", esatdo: "$estado" },
                    },
                },
            }, ],
            (err) => {
                console.log("error:", err);
            }
        );
        console.log("Agrupado-->", agrupado);
        for (let obj of agrupado) {
            const nombreUsuario = await Usuario.find({ _id: obj._id });
            obj.nombre = nombreUsuario[0].email;
        }
        res.json({
            ok: true,
            respuesta: agrupado,
        });
    } catch (error) {
        return res.status(403).json({
            msg: "0010",
            ok: false,
            msg: "Error hable con el administrador",
        });
    }
};

const darPermisoAccesoMetodo = async(req, res = response) => {
    const { idUsuario, nombreMetodo } = req.body;
    try {
        const usuarioDB = await Usuario.findOne({ _id: Types.ObjectId(idUsuario) });
        if (!usuarioDB || usuarioDB.length == 0) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado",
            });
        }
        const registroMetodosBDD = RegistroMetodos.find({ URL: nombreMetodo });
        console.log("registro metods BDD ->", registroMetodosBDD);

        if (!registroMetodosBDD || (await registroMetodosBDD).length == 0) {
            return res.status(404).json({
                ok: false,
                msg: `La ruta ${nombreMetodo} no se encuentra en los registros`,
            });
        }

        const metodosBDD = await Metodo.find({ idUsuario: Types.ObjectId(idUsuario), nombreMetodo });
        // console.log(`Verifica si tiene ya el metodo registrado:${metodosBDD}`);
        if (!metodosBDD || metodosBDD.length == 0) {
            const metodo = new Metodo(req.body);
            await metodo.save();
            return res.json({
                ok: true,
                msg: `Se concedió acceso a ${usuarioDB.email} a la ruta ${nombreMetodo}`,
                metodo,
            });
        }
        res.status(400).json({
            ok: false,
            msg: `El usuario ${usuarioDB.email} ya tiene asignado el metodo:${nombreMetodo}`,
        });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};

const ingresarNuevoMetodo = async(req, res = response) => {
    const { URL } = req.body;
    try {
        const metodosBDD = await RegistroMetodos.find({ URL });
        console.log(metodosBDD);
        if (!metodosBDD || metodosBDD.length == 0) {
            const metodo = new RegistroMetodos(req.body);
            await metodo.save();
            return res.json({
                ok: true,
                msg: `La ruta ${URL} se guardo con exito`,
                metodo,
            });
        }
        res.status(400).json({
            ok: false,
            msg: `La ruta ${URL} ya se encuentra registrada`,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
}

const consultarRegistroMetodos = async(req, res = response) => {
    try {
        const registroMetodosBDD = await RegistroMetodos.find();
        if (!registroMetodosBDD || registroMetodosBDD.length == 0) {
            return res.status(404).json({
                ok: false,
                msg: "No existen registros de metodos",
            });
        }
        res.json({
            ok: true,
            registroMetodosBDD
        });
    } catch (error) {
        return res.status(403).json({
            msg: "0010",
            ok: false,
            msg: "Error hable con el administrador",
            error,
        });
    }
}
module.exports = {
    consultaMetodosPorUsuario,
    consultaMetodosTodosUsuarios,
    darPermisoAccesoMetodo,
    ingresarNuevoMetodo,
    consultarRegistroMetodos
};