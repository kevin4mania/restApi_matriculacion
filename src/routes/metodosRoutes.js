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
    actualizarEstadoRegistroRutas
} = require("../controllers/metodosController.js");

const router = Router();

router.get(
    "/consultaMetodosPorUsuario/:IdUsuario", [validarJWT, validaAccesoUsuario],
    consultaMetodosPorUsuario
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

//**Ingresar nuevos metodos  */
router.post(
    "/ingresaNuevoMetodo", [
        check("nombre", "El nombre de la ruta es obligatorio").not().isEmpty(),
        check("descripcion", "La descripcion de la ruta es obligatoria").not().isEmpty(),
        check("observacion", "La observacion de la ruta es obligatoria").not().isEmpty(),
        check("URL", "El URL es obligatorio").not().isEmpty(),
        validarJWT,
        validarCampos,
        validaAccesoUsuario,
    ],
    ingresarNuevoMetodo
);

router.get("/consultaRegistrosMetodos", [validarJWT, validaAccesoUsuario], consultarRegistroMetodos);
router.put(
    "/actualizaMetodo", [
        check("idMetodo", "El id metodo es obligatorio").not().isEmpty(),
        check("estado", "El estado es obligatorio").not().isEmpty(),
        validarJWT,
        validarCampos,
        validaAccesoUsuario,
    ],
    actualizarEstadoMetodo
);
router.put(
    "/actualizarEstadoRegistroRuta", [
        check("idRegistroRuta", "El id del registro es obligatorio").not().isEmpty(),
        check("estadoRM", "El estado del registro es obligatorio").not().isEmpty(),
        validarJWT,
        validarCampos,
        validaAccesoUsuario,
    ],
    actualizarEstadoRegistroRutas
);

module.exports = router;