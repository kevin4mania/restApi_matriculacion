const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const Metodo = require("../models/metodos");
const { generarJWT } = require("../helpers/jwt");
// const usuario = require("../models/usuario");
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
        console.log(error);
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
                msg: "Email no encontrado",
            });
        }
        if (!usuarioDB.online) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario deshabilitado",
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

const ingresaMetodosUsuario = async(req, res = response) => {
    const { idUsuario, nombreMetodo } = req.body;
    try {
        const usuarioDB = await Usuario.findOne({ _id: Types.ObjectId(idUsuario) });
        if (!usuarioDB || usuarioDB.length == 0) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado",
            });
        }
        const metodosBDD = await Metodo.find({ idUsuario: Types.ObjectId(idUsuario), nombreMetodo });
        // console.log(`Verifica si tiene ya el metodo registrado:${metodosBDD}`);
        console.log("USER:->", usuarioDB);
        if (!metodosBDD || metodosBDD.length == 0) {
            const metodo = new Metodo(req.body);
            await metodo.save();
            return res.json({
                ok: true,
                msg: `Se consedio acceso a ${usuarioDB.nombre} al metodo ${nombreMetodo}`,
                metodo,
            });
        }
        res.status(400).json({
            ok: false,
            msg: `El usuario ${usuarioDB.nombre} ya tiene asignado el metodo:${nombreMetodo}`,
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

module.exports = {
    crearUsuario,
    login,
    renewToken,
    ingresaMetodosUsuario,
    consultarUsuarios,
};