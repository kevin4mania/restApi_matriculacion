const { check } = require("express-validator");
const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarjwt");
const { validaAccesoUsuario } = require("../middlewares/validaAccesoUsuario");


const router = Router();
const { consultarInformacionVehiculo, calcularImpuestos } = require("../controllers/saoController");

router.post("/consultarInformacionVehiculo", [validarJWT, validaAccesoUsuario], consultarInformacionVehiculo);
router.post("/calcularImpuestos", [validarJWT, validaAccesoUsuario], calcularImpuestos);

module.exports = router;