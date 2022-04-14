const { check } = require("express-validator");
const { Router } = require("express");

const { validarJWT } = require("../middlewares/validarjwt");
const { validaAccesoUsuario } = require("../middlewares/validaAccesoUsuario");
const { validarCampos } = require("../middlewares/validarCamposUsuario");
const {
    consultaMetodosPorUsuario,
    consultaMetodosTodosUsuarios,
    darPermisoAccesoMetodo,
    ingresarNuevoMetodo,
    consultarRegistroMetodos,
    actualizarEstadoMetodo,
    actualizarEstadoRegistroRutas,
    consultaMetodosNoAccesoPorUsuario,
    darPermisoAccesoMetodos
} = require("../controllers/metodosController.js");

const router = Router();

router.get(
    "/consultaMetodosPorUsuario/:IdUsuario", [validarJWT, validaAccesoUsuario],
    consultaMetodosPorUsuario
);
router.get(
    "/consultaMetodosNoAccesoPorUsuario/:IdUsuario", [validarJWT, validaAccesoUsuario],
    consultaMetodosNoAccesoPorUsuario
);
router.get(
    "/consultaMetodosTodosUsuarios", [validarJWT, validaAccesoUsuario],
    consultaMetodosTodosUsuarios
);
router.post(
    "/darPermisoAccesoMetodo", [
        check("idUsuario", "El id del usuario es obligatorio").not().isEmpty(),
        check("nombreMetodo", "El nombre del metodo es obligatorio")
        .not()
        .isEmpty(),
        validarJWT,
        validarCampos,
        validaAccesoUsuario,
    ],
    darPermisoAccesoMetodo
);
router.post(
    "/darPermisoAccesoMetodos", [
        check("idUsuario", "El id del usuario es obligatorio").not().isEmpty(),
        // check("nombreMetodo", "El nombre del metodo es obligatorio")
        // .not()
        // .isEmpty(),
        validarJWT,
        validarCampos,
        validaAccesoUsuario,
    ],
    darPermisoAccesoMetodos
);

//**Ingresar nuevos metodos  */
router.post(
    "/ingresaNuevoMetodo", [
        check("name", "El nombre de la ruta es obligatorio").not().isEmpty(),
        check("description", "La descripcion de la ruta es obligatoria")
        .not()
        .isEmpty(),
        check("observation", "La observacion de la ruta es obligatoria")
        .not()
        .isEmpty(),
        check("URL", "El URL es obligatorio").not().isEmpty(),
        validarJWT,
        validarCampos,
        validaAccesoUsuario,
    ],
    ingresarNuevoMetodo
);

router.get(
    "/consultaRegistrosMetodos", [validarJWT, validaAccesoUsuario],
    consultarRegistroMetodos
);
router.put(
    "/actualizaMetodo", [
        check("idMetodo", "El id metodo es obligatorio").not().isEmpty(),
        check("online", "El estado es obligatorio").not().isEmpty(),
        validarJWT,
        validarCampos,
        validaAccesoUsuario,
    ],
    actualizarEstadoMetodo
);
router.put(
    "/actualizarEstadoRegistroRuta", [
        check("idRegistroRuta", "El id del registro es obligatorio")
        .not()
        .isEmpty(),
        check("online", "El estado del registro es obligatorio").not().isEmpty(),
        validarJWT,
        validarCampos,
        validaAccesoUsuario,
    ],
    actualizarEstadoRegistroRutas
);


const RegistroMetodos = require("../models/registroMetodos");
const Metodos = require("../models/metodos");

router.get("/MODELO", async(req, res) => {
    const modelo = await Metodos.updateMany({}, { $rename: { estado: "online" } });
    res.json({
        modelo,
    });
});

module.exports = router;