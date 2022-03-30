const Metodo = require("../models/metodos");
const { Types } = require("mongoose");

const validaAccesoUsuario = async(req, res, next) => {
    try {
        // console.log(req);
        // const idUsuario = req.header("idUsuario");
        const pathURL = req.route.path.split(":");
        const baseURL = req.baseUrl;
        const usuarioREQ = req.usuario;
        let nombreMetodo = "";
        if (pathURL.length > 1) {
            nombreMetodo = baseURL + pathURL[0].substring(0, pathURL[0].length - 1);
        } else {
            nombreMetodo = baseURL + pathURL[0];
        }
        /*         
                console.log(`Nombre metodo:${nombreMetodo} - typo:${typeof nombreMetodo} `);
                console.log(`Id usuario:${idUsuario} - typo:${typeof idUsuario}`);
                if (!idUsuario) {
                    return res.status(401).json({
                        ok: false,
                        msg: "No hay usuario en la peticion",
                    });
                }
         */
        // {idUsuario:ObjectId('6241e7696be7e92440b3746b'),nombreMetodo:'/api/generales/consultarLicencia',estado:true}
        // { idUsuario: Types.ObjectId(idUsuario), nombreMetodo, estado: true }
        const metodoBDD = await Metodo.find({ idUsuario: Types.ObjectId(usuarioREQ), nombreMetodo, estado: true });
        console.log("Resultado de la bsuqueda en la base-->", metodoBDD);

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