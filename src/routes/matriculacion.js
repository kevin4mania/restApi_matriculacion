const { Router } = require("express");
const { validarJWT } = require('../middlewares/validarjwt');
const { matriculacion } = require('../controllers/matriculacion');

const router = Router();

router.post('/matriculacion/:placa', validarJWT, matriculacion);


module.exports = router;