const { Types } = require("mongoose");

const Metodo = require("../models/metodos");
const Usuario = require("../models/usuario");

const version = async(req, res) => {
    const datos = {
        name: "Api to MATRICULACION",
        website: "MATRICULACION-AMT",
        "v1.0": "2022-03-21",
        puerto: process.env.PORT,
    };
    res.json(datos);
};

const descripccionMetodos = async(req, res) => {
    const infMetodos = [
        //**Metodos Usuario */
        {
            nombre: "Crear usuarios",
            descripcion: "Agrega usuarios en la BDD con estado activo y genera un token",
            URL: "/api/login/new",
        },
        {
            nombre: "Login usuario",
            descripcion: "Valida el usuario en la BDD y genera un token valido",
            URL: "/api/login",
        },
        {
            nombre: "Consultar Usuarios",
            descripcion: "Obtiene todos los usuarios registrados en el sistema (requiere:[token,acceso] para usar)",
            URL: "/api/login/usuarios",
        },
        {
            nombre: "Permitir acceso metodos",
            descripcion: "Otorga permiso al usuario para consumir los metodos (requiere:[token,acceso] para usar)",
            URL: "/api/login/ingresaMetodosUsuario",
        },
        //**Metodos Informacion */
        {
            nombre: "consulta version",
            descripcion: "Otorga permiso al usuario para consumir los metodos (requiere:[token] para usar)",
            URL: "/api/informacion/version",
        },
        {
            nombre: "consulta metodos",
            descripcion: "regresa los metodos a los que tiene acceso el suaurio (requiere:[token] para usar)",
            URL: "/api/informacion/metodos",
        },
        {
            nombre: "consulta metodos de usuarios",
            descripcion: "regresa los metodos a los que tiene acceso otros suaurios (requiere:[token,acceso] para usar)",
            URL: "/api/informacion/metodosID",
        },
        {
            nombre: "consultar todos los metodos",
            descripcion: "regresa los metodos a los que tiene acceo cada usuario (requiere:[token,acceso] para usar)",
            URL: "/api/informacion/AllMetodos",
        },
        {
            nombre: "consultar descripcion metodos",
            descripcion: "regresa todos los metodos  (requiere:[token,acceso] para usar)",
            URL: "/api/informacion/descripcionMetodos",
        },
        //**Metodos consultas generales */
        {
            nombre: "consultar vehiculos",
            descripcion: "? (requiere:[token,acceso] para usar)",
            URL: "/api/generales/consultarVehiculo",
        },
        {
            nombre: "consultar Bloqueo",
            descripcion: "? (requiere:[token,acceso] para usar)",
            URL: "/api/generales/consultarBloqueo",
        },
        {
            nombre: "consultar Historial",
            descripcion: "? (requiere:[token,acceso] para usar)",
            URL: "/api/generales/consultarHistorial",
        },
        {
            nombre: "consultar Licencia",
            descripcion: "? (requiere:[token,acceso] para usar)",
            URL: "/api/generales/consultarLicencia",
        },
        {
            nombre: "consultar Deudas",
            descripcion: "? (requiere:[token,acceso] para usar)",
            URL: "/api/generales/consultarDeudas",
        },
        //**Metodos SAO */
        {
            nombre: "consultar Informacion Vehiculo",
            descripcion: "? (requiere:[token,acceso] para usar)",
            URL: "/api/sao/consultarInformacionVehiculo",
        },
        {
            nombre: "calcular Impuestos",
            descripcion: "? (requiere:[token,acceso] para usar)",
            URL: "/api/sao/calcularImpuestos",
        },
    ];
    res.json(infMetodos);
};

const accesoMetodos = async(req, res) => {
    try {
        const usuarioREQ = req.usuario;
        const usuarioBDD = await Usuario.find({ _id: Types.ObjectId(usuarioREQ) });
        const metodoBDD = await Metodo.find({
            idUsuario: Types.ObjectId(usuarioREQ),
            estado: true,
        });
        if (!metodoBDD || metodoBDD.length == 0) {
            return res.json({
                ok: false,
                codError: "0001",
                msg: "Usuario no tiene metodos asignados",
            });
        }
        // console.log("Metodo USBD->", metodoBDD);
        res.json({
            codError: "0001",
            ok: true,
            usuario: { nombre: usuarioBDD[0].nombre, email: usuarioBDD[0].email },
            metodosAcceso: metodoBDD,
        });
    } catch (error) {
        return res.json({
            codError: "0001",
            ok: false,
            msg: "Error hable con el administrador",
        });
    }
};

module.exports = {
    version,
    descripccionMetodos,
    accesoMetodos
};