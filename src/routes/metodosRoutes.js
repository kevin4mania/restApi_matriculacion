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
    consultarRegistroMetodos
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
        check("nombre", "El id del usuario es obligatorio").not().isEmpty(),
        check("descripcion", "El id del usuario es obligatorio").not().isEmpty(),
        check("observacion", "El id del usuario es obligatorio").not().isEmpty(),
        check("URL", "El id del usuario es obligatorio").not().isEmpty(),
        validarJWT,
        validarCampos,
        validaAccesoUsuario,
    ],
    ingresarNuevoMetodo
);

router.get("/consultaRegistrosMetodos", [validarJWT, validaAccesoUsuario], consultarRegistroMetodos);

module.exports = router;