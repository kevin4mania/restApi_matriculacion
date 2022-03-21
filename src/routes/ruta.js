const { Router } = require("express");
const router = Router();
const { usuario } = require("../controllers/auth")
const { validarJWT } = require('../middlewares/validarjwt');
const { consultar } = require('../controllers/consultasGenerales');
const { infracciones } = require('../controllers/infracciones');
const { matriculacion } = require('../controllers/matriculacion');
const { rtv } = require('../controllers/rtv');
const { version } = require('../modells/version');

//RUTA VERSION
router.get('version', version);

//RUTA DE LOGIN
router.post('/login', usuario);

//rutas de WSDL
router.post('/consultas/:placa', validarJWT, consultar);
router.post('/infracciones/:placa', validarJWT, infracciones);
router.post('/matriculacion/:placa', validarJWT, matriculacion);
router.post('/rtv/:placa', validarJWT, rtv);

module.exports = router;