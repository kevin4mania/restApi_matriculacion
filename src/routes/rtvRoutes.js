const { check } = require("express-validator");
const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarjwt");
const { validaAccesoUsuario } = require("../middlewares/validaAccesoUsuario");
const { validarCampos } = require("../middlewares/validarCamposUsuario");

const router = Router();

const {
    consultaVehiculoPlaca,
    saveVehiculo,
} = require("../controllers/rtvController");

router.post(
    "/consultaVehiculo", [validarJWT, validaAccesoUsuario],
    consultaVehiculoPlaca
);
router.post("/saveVehiculo", [validarJWT, validaAccesoUsuario], saveVehiculo);

module.exports = router;