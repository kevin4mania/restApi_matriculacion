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
            return res.json({
                codError: "0010",
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
            codError: "0001",
            usuario,
            token,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            codError: "999",
            msg: "Hable con el administrador",
        });
    }
};

const login = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.json({
                ok: false,
                codError: "0010",
                msg: "Credenciales incorrectas",
            });
        }
        // console.log(usuarioDB);
        if (!usuarioDB.online) {
            return res.json({
                ok: false,
                codError: "0002",
                msg: `El usuario ${usuarioDB.email} se encuentra inactivo`
            });
        }
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.json({
                ok: false,
                codError: "0010",
                msg: "Credenciales incorrectas",
            });
        }
        const token = await generarJWT(usuarioDB);

        res.json({
            ok: true,
            codError: "0001",
            usuario: usuarioDB,
            token,
        });
    } catch (error) {
        // console.log(error);
        return res.json({
            ok: false,
            codError: "999",
            msg: "Hable con el administrador",
        });
    }
};

const consultarUsuarios = async(req, res = response) => {
    try {
        const usuarioDB = await Usuario.find();
        if (!usuarioDB || usuarioDB.length == 0) {
            return res.json({
                ok: false,
                codError: "0010",
                msg: "No existen usuarios",
            });
        }
        res.json({
            ok: true,
            codError: "0001",
            usuarios: usuarioDB,
        });
    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            codError: "999",
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
            return res.json({
                ok: false,
                codError: "0010",
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
        // console.log("actualizacion del usuario", userUpdateBDD);
        if (!userUpdateBDD || userUpdateBDD.length == 0) {
            return res.json({
                ok: false,
                codError: "0002",
                msg: "Ocurrio un error al guardar en la base",
            });
        }

        res.json({
            ok: true,
            codError: "0001",
            msg: `Se actualizo los datos del usuario`,
            userUpdateBDD,
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
    crearUsuario,
    login,
    // renewToken,
    consultarUsuarios,
    actualizarEstadoUsuario,
    // loginPrueba
};