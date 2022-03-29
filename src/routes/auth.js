/*
    path: api/login

*/
const { Router } = require("express");
const { check } = require("express-validator");

const { crearUsuario, login, renewToken, ingresaMetodosUsuario } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validarCamposUsuario");
const { validarJWT } = require("../middlewares/validarjwt");

const router = Router();

router.post("/new", [check("nombre", "El nombre es obligatorio").not().isEmpty(), check("password", "La contraseña es obligatoria").not().isEmpty(), check("email", "El correo es obligatorio").isEmail(), validarCampos], crearUsuario);
router.post("/", [check("password", "La contraseña es obligatoria").not().isEmpty(), check("email", "El correo es obligatorio").isEmail()], login);
router.post("/ingresaMetodosUsuario", [check("idUsuario", "El id del usuario es obligatorio").not().isEmpty(), check("nombreMetodo", "El nombre del metodo es obligatorio").not().isEmpty(), validarCampos, validarJWT], ingresaMetodosUsuario);
router.get("/renew", validarJWT, renewToken);



module.exports = router;