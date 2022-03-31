const { check } = require("express-validator");
const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarjwt");
const { validaAccesoUsuario } = require("../middlewares/validaAccesoUsuario");
const { validarCampos } = require("../middlewares/validarCamposUsuario");

const router = Router();
const {
    consultarInformacionVehiculo,
    calcularImpuestos,
} = require("../controllers/saoController");

router.post(
    "/consultarInformacionVehiculo", [
        check("tipo", "el tipo es obligatorio").not().isEmpty(),
        check("valor", "el valor es obligatoria").not().isEmpty(),
        validarJWT,
        validarCampos,
        validaAccesoUsuario,
    ],
    consultarInformacionVehiculo
);
router.post(
    "/calcularImpuestos", [
        check("tipo", "el tipo es obligatorio").not().isEmpty(),
        check("valor", "el valor es obligatoria").not().isEmpty(),
        validarJWT,
        validarCampos,
        validaAccesoUsuario,
    ],
    calcularImpuestos
);

module.exports = router;