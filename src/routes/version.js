const { check } = require("express-validator");
const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarjwt");

const router = Router();
const { version, metodosConacceso } = require("../models/version");


router.get('/', validarJWT, version);

router.get("/metodos", validarJWT, metodosConacceso);

module.exports = router;