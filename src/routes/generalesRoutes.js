const { check } = require("express-validator");

const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarjwt");
const { validaAccesoUsuario } = require("../middlewares/validaAccesoUsuario");
const { validarCampos } = require("../middlewares/validarCamposUsuario");
const {
    consultarVehiculo,
    consultarBloqueos,
    consultarHistorial,
    consultarLicencia,
    consultarDeudas,
} = require("../controllers/generalesController");

const router = Router();
// [check("placa", "El nombre es obligatorio").not().isEmpty()]
// validarJWT

router.get(
    "/consultarVehiculo/:placa", [validarJWT, validaAccesoUsuario],
    consultarVehiculo
);
router.get(
    "/consultarBloqueo/:placa", [validarJWT, validaAccesoUsuario],
    consultarBloqueos
);
router.get(
    "/consultarHistorial/:placa", [validarJWT, validaAccesoUsuario],
    consultarHistorial
);
router.post(
    "/consultarLicencia", [
        check("identificacion", "la identificacion es obligatoria").not().isEmpty(),
        check("canal", "el canal es obligatorio").not().isEmpty(),
        check("usuario", "El usuario es obligatorio").not().isEmpty(),
        validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    consultarLicencia
);
router.post(
    "/consultarDeudas", [
        check("tipoIdentificacion", "el tipoIdentificacion es obligatorio").not().isEmpty(),
        check("identificacion", "la identificacion es obligatoria").not().isEmpty(),
        check("placa", "la placa es obligatorio").not().isEmpty(),
        validarJWT,
        validarCampos,
        validaAccesoUsuario,
    ],
    consultarDeudas
);

module.exports = router;