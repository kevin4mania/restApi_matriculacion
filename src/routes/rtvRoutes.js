const { check } = require("express-validator");
const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarjwt");
const { validaAccesoUsuario } = require("../middlewares/validaAccesoUsuario");
const { validarCampos } = require("../middlewares/validarCamposUsuario");

const router = Router();

const {
    consultaVehiculoPlaca,
    saveVehiculo,
    anularOrden,
    ACCESOWS,
} = require("../controllers/rtvController");

router.post(
    "/consultaVehiculo", [validarJWT, validaAccesoUsuario],
    consultaVehiculoPlaca
);
router.post("/saveVehiculo", [validarJWT, validaAccesoUsuario], saveVehiculo);
router.post("/anularOrden", anularOrden);

//**Borrar */
router.post("/ACCESO", ACCESOWS);

module.exports = router;