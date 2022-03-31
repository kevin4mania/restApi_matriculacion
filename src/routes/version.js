const { check } = require("express-validator");
const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarjwt");

const router = Router();
const { version, metodosConacceso, buscaMetodosConAccesoID, buscaTodosUsuariosMetodos, descripccionMetodos } = require("../models/version");
const { validaAccesoUsuario } = require("../middlewares/validaAccesoUsuario");

router.get("/version", version);
router.get("/metodos", validarJWT, metodosConacceso);
router.get("/metodosID/:IdUsuario", [validarJWT, validaAccesoUsuario], buscaMetodosConAccesoID);
router.get("/AllMetodos", [validarJWT, validaAccesoUsuario], buscaTodosUsuariosMetodos);
router.get("/descripcionMetodos", [validarJWT, validaAccesoUsuario], descripccionMetodos);

module.exports = router;