const { check } = require("express-validator");
const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarjwt");
const { validaAccesoUsuario } = require("../middlewares/validaAccesoUsuario");
const { validarCampos } = require("../middlewares/validarCamposUsuario");
const {
    envioEmail,
    envioEmailAdjuntos,
} = require("../controllers/apiMailController");
const router = Router();

router.post(
    "/envioEmail", [
        check("to", "El remitente es obligatorio").not().isEmpty(),
        check("subject", "El asunto es obligatorio").not().isEmpty(),
        check("html", "El mensaje es obligatorio").not().isEmpty(),
        validarJWT,
        validarCampos,
        validaAccesoUsuario,
    ],
    envioEmail
);
router.post("/envioEmailAdjuntos", [
    check("to", "El remitente es obligatorio").not().isEmpty(),
    check("subject", "El asunto es obligatorio").not().isEmpty(),
    check("html", "El mensaje es obligatorio").not().isEmpty(),
    validarJWT,
    validarCampos,
    validaAccesoUsuario,
], envioEmailAdjuntos);

module.exports = router;