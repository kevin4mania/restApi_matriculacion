const { check } = require("express-validator");
const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarjwt");

const router = Router();
const { consultarInformacionVehiculo, calcularImpuestos } = require("../controllers/saoController");

router.post("/consultarInformacionVehiculo", validarJWT, consultarInformacionVehiculo);
router.post("/calcularImpuestos", validarJWT, calcularImpuestos);

module.exports = router;