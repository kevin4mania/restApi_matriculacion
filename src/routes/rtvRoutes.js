const { check } = require("express-validator");
const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarjwt");
const { validaAccesoUsuario } = require("../middlewares/validaAccesoUsuario");
const { validarCampos } = require("../middlewares/validarCamposUsuario");

const router = Router();

const {
    consultaVehiculoPlaca,
    saveVehiculo,
    anularOrden,
    consultarResultado,
    finalizarOrden,
    registrarResultado,
    solicitarOrden,
    solicitarOrdenGAD,
    validarOrden,
    verificarOrden,
    ACCESOWS,
} = require("../controllers/rtvController");

router.post(
    "/consultaVehiculo", [validarJWT, validaAccesoUsuario],
    consultaVehiculoPlaca
);
router.post("/saveVehiculo", [validarJWT, validaAccesoUsuario], saveVehiculo);
router.post("/anularOrden", [validarCampos], anularOrden);
router.post("/consultarResultado", [validarCampos], consultarResultado);
router.post("/finalizarOrden", [validarCampos], finalizarOrden);
router.post("/registrarResultado", [validarCampos], registrarResultado);
router.post("/solicitarOrden", [validarCampos], solicitarOrden);
router.post("/solicitarOrdenGAD", [validarCampos], solicitarOrdenGAD);
router.post("/validarOrden", [validarCampos], validarOrden);
router.post("/verificarOrden", [validarCampos], verificarOrden);

//**Borrar */
router.post("/ACCESO", ACCESOWS);

module.exports = router;