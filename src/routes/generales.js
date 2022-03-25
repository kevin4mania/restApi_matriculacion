/**
 * TODO:hacer los metodos 
 * *Consultar licencia
 * *Consultar historial
 * *Consultar deudas
 * *Consultar bloqueos
 * *Consultar vehiculo
 * 
 * ?WSDL_MATRICULACION
 * 
 * 
 * 
 * 
 */


const { Router } = require("express");
const { validarJWT } = require('../middlewares/validarjwt');
const { consultarVehiculo } = require('../controllers/generalesController');

const router = Router();
// validarJWT
router.get('/consultarVehiculo/:placa', consultarVehiculo);


module.exports = router;