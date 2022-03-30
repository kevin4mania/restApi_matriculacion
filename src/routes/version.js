const { check } = require("express-validator");
const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarjwt");

const router = Router();
const { version, metodosConacceso, buscaMetodosConAccesoID } = require("../models/version");
const { validaAccesoUsuario } = require("../middlewares/validaAccesoUsuario");

router.get("/", validarJWT, version);
router.get("/metodos", validarJWT, metodosConacceso);
router.get("/metodosID/:IdUsuario", [validarJWT, validaAccesoUsuario], buscaMetodosConAccesoID);

module.exports = router;