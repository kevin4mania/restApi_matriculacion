/*
    path: api/login

*/
const { Router } = require("express");

const { usuario } = require("../controllers/auth")
const { validarJWT } = require('../middlewares/validarjwt');
const { consultar } = require('../controllers/consultasGenerales');
const { infracciones } = require('../controllers/infracciones');
const { matriculacion } = require('../controllers/matriculacion');
const { rtv } = require('../controllers/rtv');
const { version } = require('../models/version');

const router = Router();

//RUTA VERSION
router.get('/version', version);


//rutas de WSDL
router.get('/consultas/:placa', validarJWT, consultar);
router.post('/infracciones/:placa', validarJWT, infracciones);
router.post('/matriculacion/:placa', validarJWT, matriculacion);
router.post('/rtv/:placa', validarJWT, rtv);

module.exports = router;