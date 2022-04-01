const { response } = require("express");
const bcrypt = require("bcryptjs");
const _ = require('underscore')

const Usuario = require("../models/usuario");
const Metodo = require("../models/metodos");
const { generarJWT } = require("../helpers/jwt");

const { Types } = require("mongoose");

const crearUsuario = async(req, res = response) => {
    const { email, password } = req.body;
    // console.log("MEtodo->", req.body);
    try {
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "El correo ya está registrado",
            });
        }

        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // Generar mi JWT
        const token = await generarJWT(usuario);

        res.json({
            ok: true,
            usuario,
            token,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};

const login = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "Credenciales incorrectas",
            });
        }
        if (!usuarioDB.online) {
            return res.status(404).json({
                ok: false,
                msg: `El usuario ${usuarioDB.nombre} se encuentra inactivo`
            });
        }
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "La contraseña no es valida",
            });
        }
        const token = await generarJWT(usuarioDB);

        res.json({
            ok: true,
            usuario: usuarioDB,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};

const consultarUsuarios = async(req, res = response) => {
    try {
        const usuarioDB = await Usuario.find();
        if (!usuarioDB || usuarioDB.length == 0) {
            return res.status(404).json({
                ok: false,
                msg: "No existen usuarios",
            });
        }
        res.json({
            ok: true,
            usuarios: usuarioDB,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};

const actualizarEstadoUsuario = async(req, res = response) => {
    const { idUsuario } = req.body;
    try {
        let data = req.body;
        const usuarioDB = await Usuario.findOne({ _id: Types.ObjectId(idUsuario) });
        if (!usuarioDB || usuarioDB.length == 0) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado",
            });
        }
        // console.log("Contraseña que llega-/>", data.password);
        if (data.password != undefined) {
            const salt = bcrypt.genSaltSync();
            data.password = bcrypt.hashSync(req.body.password, salt);
        }

        //**especifico los campos que voy actualizar */
        let body = _.pick(data, ['nombre', 'email', 'password', 'online']);
        //**Lo que no quiero que se actualice elimino */
        delete body.email;

        const userUpdateBDD = await Usuario.findByIdAndUpdate(idUsuario, body, { new: true, runValidators: true, context: 'query' });
        console.log("actualizacion del usuario", userUpdateBDD);
        if (!userUpdateBDD || userUpdateBDD.length == 0) {
            return res.status(400).json({
                ok: false,
                msg: "Ocurrio un error al guardar en la base",
            });
        }

        res.json({
            ok: true,
            msg: `Se actualizo los datos del usuario`,
            userUpdateBDD,
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
}

/* 
const renewToken = async(req, res = response) => {
    const uid = req.uid;

    // generar un nuevo JWT, generarJWT... uid...
    const token = await generarJWT(uid);

    // Obtener el usuario por el UID, Usuario.findById...
    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        usuario,
        token,
    });
};
 */
module.exports = {
    crearUsuario,
    login,
    // renewToken,
    consultarUsuarios,
    actualizarEstadoUsuario
};