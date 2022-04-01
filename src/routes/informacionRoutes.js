const { check } = require("express-validator");
const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarjwt");
const {
    version,
    accesoMetodos,
    descripccionMetodos,
} = require("../controllers/informacionController");
const { validaAccesoUsuario } = require("../middlewares/validaAccesoUsuario");

const router = Router();


router.get("/version", version);
router.get("/accesoMetodos", validarJWT, accesoMetodos);
router.get(
    "/descripcionMetodos", [validarJWT, validaAccesoUsuario],
    descripccionMetodos
);

module.exports = router;