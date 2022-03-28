/**
 * TODO:hacer los metodos
 * *Consultar licencia**
 * *Consultar historial**
 * *Consultar deudas
 * *Consultar bloqueos**
 * *Consultar vehiculo**
 *
 * ?WSDL_MATRICULACION
 *
 *
 *
 *
 */

const { check } = require("express-validator");

const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarjwt");
const { consultarVehiculo, consultarBloqueos, consultarHistorial, consultarLicencia, consultarDeudas } = require("../controllers/generalesController");

const router = Router();
// [check("placa", "El nombre es obligatorio").not().isEmpty()]
// validarJWT

router.get("/consultarVehiculo/:placa", validarJWT, consultarVehiculo);
router.get("/consultarBloqueo/:placa", validarJWT, consultarBloqueos);
router.get("/consultarHistorial/:placa", validarJWT, consultarHistorial);
router.post("/consultarLicencia", validarJWT, consultarLicencia);
router.post("/consultarDeudas", validarJWT, consultarDeudas);

module.exports = router;