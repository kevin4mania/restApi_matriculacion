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
 */

const { check } = require("express-validator");

const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarjwt");
const { validaAccesoUsuario } = require("../middlewares/validaAccesoUsuario");
const { consultarVehiculo, consultarBloqueos, consultarHistorial, consultarLicencia, consultarDeudas } = require("../controllers/generalesController");

const router = Router();
// [check("placa", "El nombre es obligatorio").not().isEmpty()]
// validarJWT

router.get("/consultarVehiculo/:placa", [validarJWT, validaAccesoUsuario], consultarVehiculo);
router.get("/consultarBloqueo/:placa", [validarJWT, validaAccesoUsuario], consultarBloqueos);
router.get("/consultarHistorial/:placa", [validarJWT, validaAccesoUsuario], consultarHistorial);
router.post("/consultarLicencia", [validarJWT, validaAccesoUsuario], consultarLicencia);
router.post("/consultarDeudas", [validarJWT, validaAccesoUsuario], consultarDeudas);

module.exports = router;