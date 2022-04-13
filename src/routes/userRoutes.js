const { Router } = require("express");
const { check } = require("express-validator");

const {
    crearUsuario,
    login,
    // renewToken,
    consultarUsuarios,
    actualizarEstadoUsuario,
} = require("../controllers/userController");
const { validarCampos } = require("../middlewares/validarCamposUsuario");
const { validarJWT } = require("../middlewares/validarjwt");
const { validaAccesoUsuario } = require("../middlewares/validaAccesoUsuario");

const router = Router();

router.post(
    "/new", [
        check("username", "El nombre es obligatorio").not().isEmpty(),
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("password", "La contraseña es obligatoria").not().isEmpty(),
        check("email", "El correo es obligatorio").not().isEmpty(),
        validarJWT,
        validarCampos,
        validaAccesoUsuario
    ],
    crearUsuario
);
router.post(
    "/", [
        check("password", "La contraseña es obligatoria").not().isEmpty(),
        check("email", "El correo es obligatorio").not().isEmpty(),
        validarCampos,
    ],
    login
);
router.get("/usuarios", [validarJWT, validaAccesoUsuario], consultarUsuarios);
router.put(
    "/actualizaUsuario", [
        check("idUsuario", "El idUsuario es obligatorio").not().isEmpty(),
        check("online", "El estado es obligatorio").not().isEmpty(),
        validarJWT,
        validarCampos,
        validaAccesoUsuario,
    ],
    actualizarEstadoUsuario
);

// router.get("/renew", validarJWT, renewToken);

module.exports = router;