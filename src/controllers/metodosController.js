const { Types } = require("mongoose");
const _ = require('underscore');

const Metodo = require("../models/metodos");
const Usuario = require("../models/usuario");
const RegistroMetodos = require("../models/registroMetodos");

const consultaMetodosPorUsuario = async(req, res) => {
    try {
        const { IdUsuario } = req.params;
        const usuarioBDD = await Usuario.find({ _id: Types.ObjectId(IdUsuario) });
        if (!usuarioBDD || usuarioBDD.length == 0) {
            return res.json({
                ok: false,
                codError: "0010",
                msg: "Usuario no encontrado",
            });
        }
        const metodoBDD = await Metodo.find({
            idUsuario: Types.ObjectId(IdUsuario)
        });
        if (!metodoBDD || metodoBDD.length == 0) {
            return res.json({
                ok: false,
                codError: "0002",
                usuario: usuarioBDD[0].email,
                msg: "Usuario no tiene metodos asignados",
            });
        }
        let arrMetodo = [];
        for (let metodo of metodoBDD) {
            let registroMetodosBDD = await RegistroMetodos.findOne({ URL: metodo.nombreMetodo });
            // console.log("POR USUARIO",registroMetodosBDD);
            arrMetodo.push({
                name: registroMetodosBDD.name,
                description: registroMetodosBDD.description,
                observation: registroMetodosBDD.observation,
                URL: metodo.nombreMetodo,
                online: metodo.online,
                id: metodo._id
            });
        }
        res.json({
            ok: true,
            codError: "0001",
            usuario: usuarioBDD[0].email,
            metodosAcceso: arrMetodo,
        });
    } catch (error) {
        return res.json({
            codError: "999",
            ok: false,
            msg: "Error hable con el administrador",
        });
    }
};
const consultaMetodosNoAccesoPorUsuario = async(req, res) => {
    try {
        const { IdUsuario } = req.params;
        const usuarioBDD = await Usuario.find({ _id: Types.ObjectId(IdUsuario) });
        if (!usuarioBDD || usuarioBDD.length == 0) {
            return res.json({
                ok: false,
                codError: "0010",
                msg: "Usuario no encontrado",
            });
        }
        const metodoBDD = await Metodo.find({
            idUsuario: { $ne: Types.ObjectId(IdUsuario) }
        });
        if (!metodoBDD || metodoBDD.length == 0) {
            return res.json({
                ok: false,
                codError: "0002",
                usuario: usuarioBDD[0].email,
                msg: "Usuario no tiene metodos asignados",
            });
        }
        let arrMetodo = [];
        for (let metodo of metodoBDD) {
            let registroMetodosBDD = await RegistroMetodos.findOne({ URL: metodo.nombreMetodo });
            // console.log(registroMetodosBDD);
            arrMetodo.push({
                name: registroMetodosBDD.name,
                description: registroMetodosBDD.description,
                observation: registroMetodosBDD.observation,
                URL: metodo.nombreMetodo,
                online: metodo.online,
                id: metodo._id
            });
        }
        res.json({
            ok: true,
            codError: "0001",
            usuario: usuarioBDD[0].email,
            metodosSinAcceso: arrMetodo,
        });
    } catch (error) {
        return res.json({
            codError: "999",
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
            return res.json({
                ok: false,
                codError: "0010",
                msg: "No existen metodos",
            });
        }
        const agrupado = await Metodo.aggregate(
            [{
                $group: {
                    _id: "$idUsuario",
                    metodos: {
                        $addToSet: { nombre: "$nombreMetodo", online: "$online" },
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
        return res.json({
            ok: false,
            codError: "0010",
            msg: "Error hable con el administrador",
        });
    }
};

const darPermisoAccesoMetodo = async(req, res = response) => {
    const { idUsuario, nombreMetodo } = req.body;
    try {
        const usuarioDB = await Usuario.findOne({ _id: Types.ObjectId(idUsuario) });
        if (!usuarioDB || usuarioDB.length == 0) {
            return res.json({
                ok: false,
                codError: "0002",
                msg: "Usuario no encontrado",
            });
        }
        const registroMetodosBDD = RegistroMetodos.find({ URL: nombreMetodo });
        // console.log("registro metods BDD ->", registroMetodosBDD);

        if (!registroMetodosBDD || (await registroMetodosBDD).length == 0) {
            return res.json({
                ok: false,
                codError: "0010",
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
                codError: "0001",
                msg: `Se concedió acceso a ${usuarioDB.email} a la ruta ${nombreMetodo}`,
                metodo,
            });
        }
        res.json({
            ok: false,
            codError: "0010",
            msg: `El usuario ${usuarioDB.email} ya tiene asignado el metodo:${nombreMetodo}`,
        });
    } catch (error) {
        res.json({
            ok: false,
            codError: "999",
            msg: "Hable con el administrador",
        });
    }
};
const darPermisoAccesoMetodos = async(req, res = response) => {
    const { idUsuario, arrMetodos } = req.body;
    try {
        const usuarioDB = await Usuario.findOne({ _id: Types.ObjectId(idUsuario) });
        if (!usuarioDB || usuarioDB.length == 0) {
            return res.json({
                ok: false,
                codError: "0002",
                msg: "Usuario no encontrado",
            });
        }
        let arrRest = [];
        console.log(`metodos ${arrMetodos} ->tipo:${typeof(arrMetodos)}`);
        for (let nombreMetodo of arrMetodos) {
            console.log(`M:${nombreMetodo} valor:${nombreMetodo.ruta}`);
            const registroMetodosBDD = await RegistroMetodos.find({ URL: nombreMetodo.ruta });
            if (!registroMetodosBDD || (registroMetodosBDD).length == 0) {
                // return res.json({
                arrRest.push({
                    ok: false,
                    codError: "0010",
                    msg: `La ruta ${nombreMetodo.ruta} no se encuentra en los registros`,
                });
                continue;
            }
            const metodosBDD = await Metodo.find({ idUsuario: Types.ObjectId(idUsuario), nombreMetodo: nombreMetodo.ruta });
            if (!metodosBDD || metodosBDD.length == 0) {
                let acceso = {
                    idUsuario,
                    nombreMetodo: nombreMetodo.ruta
                }
                console.log(acceso);
                const metodo = new Metodo(acceso);
                await metodo.save((err) => {
                    if (err) {
                        arrRest.push({
                            ok: false,
                            codError: "0010",
                            msg: `error al guardar en la base: ${err}`,
                        })
                    }
                });
                arrRest.push({
                    ok: true,
                    codError: "0001",
                    msg: `Se concedió acceso a ${usuarioDB.email} a la ruta ${nombreMetodo.ruta}`,
                    // metodo,
                });
                continue;
            }
            // res.json({
            arrRest.push({
                ok: false,
                codError: "0010",
                msg: `El usuario ${usuarioDB.email} ya tiene asignado el metodo:${nombreMetodo.ruta}`,
            });


        }
        res.json({
            ok: true,
            codError: "0001",
            resultado: arrRest
        });

    } catch (error) {
        res.json({
            ok: false,
            codError: "999",
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
                codError: "0001",
                msg: `La ruta ${URL} se guardo con exito`,
                metodo,
            });
        }
        res.json({
            ok: false,
            codError: "0002",
            msg: `La ruta ${URL} ya se encuentra registrada`,
        });

    } catch (error) {
        res.json({
            ok: false,
            codError: "999",
            msg: "Hable con el administrador",
        });
    }
}

const consultarRegistroMetodos = async(req, res = response) => {
    try {
        const registroMetodosBDD = await RegistroMetodos.find();
        if (!registroMetodosBDD || registroMetodosBDD.length == 0) {
            return res.json({
                ok: false,
                codError: "0002",
                msg: "No existen registros de metodos",
            });
        }
        res.json({
            ok: true,
            codError: "0001",
            registroMetodosBDD
        });
    } catch (error) {
        return res.json({
            codError: "999",
            ok: false,
            msg: "Error hable con el administrador",
        });
    }
}

const actualizarEstadoMetodo = async(req, res = response) => {
    const { idMetodo } = req.body;
    try {
        let data = req.body;
        const metodoDB = await Metodo.findOne({ _id: Types.ObjectId(idMetodo) });
        if (!metodoDB || metodoDB.length == 0) {
            return res.json({
                ok: false,
                codError: "0002",
                msg: "Ruta no encontrada",
            });
        }
        let body = _.pick(data, ['nombreMetodo', 'online']);
        delete body.nombreMetodo;
        const metodoUpdateBDD = await Metodo.findByIdAndUpdate(idMetodo, body, { new: true, runValidators: true, context: 'query' });
        if (!metodoUpdateBDD || metodoUpdateBDD.length == 0) {
            return res.json({
                ok: false,
                codError: "0010",
                msg: "Ocurrio un error al guardar en la base",
            });
        }
        res.json({
            ok: true,
            codError: "0001",
            msg: `Se actualizo los datos`,
            metodoUpdateBDD,
        });
    } catch (error) {
        return res.json({
            ok: false,
            codError: "999",
            msg: "Hable con el administrador",
        });
    }
}

const actualizarEstadoRegistroRutas = async(req, res = response) => {
    const { idRegistroRuta } = req.body;
    try {
        let data = req.body;
        const registroRutaBDD = await RegistroMetodos.findOne({ _id: Types.ObjectId(idRegistroRuta) });
        if (!registroRutaBDD || registroRutaBDD.length == 0) {
            return res.json({
                ok: false,
                codError: "0002",
                msg: "Ruta no encontrada",
            });
        }
        let body = _.pick(data, ['nombre', 'descripcion', 'observacion', 'URL', 'online']);
        const registroBDD = await RegistroMetodos.findByIdAndUpdate(idRegistroRuta, body, { new: true, runValidators: true, context: 'query' });
        if (!registroBDD || registroBDD.length == 0) {
            return res.json({
                ok: false,
                codError: "0002",
                msg: "Ocurrio un error al guardar en la base",
            });
        }
        res.json({
            ok: true,
            codError: "0001",
            msg: `Se actualizo los datos`,
            registroBDD,
        });
    } catch (error) {
        return res.json({
            ok: false,
            codError: "999",
            msg: "Hable con el administrador",
        });
    }
}

module.exports = {
    consultaMetodosPorUsuario,
    consultaMetodosTodosUsuarios,
    darPermisoAccesoMetodo,
    ingresarNuevoMetodo,
    consultarRegistroMetodos,
    actualizarEstadoMetodo,
    actualizarEstadoRegistroRutas,
    consultaMetodosNoAccesoPorUsuario,
    darPermisoAccesoMetodos
};