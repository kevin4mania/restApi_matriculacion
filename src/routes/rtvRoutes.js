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
router.post("/anularOrden", [validarJWT, validaAccesoUsuario], anularOrden);
router.post(
    "/consultarResultado", [validarJWT, validaAccesoUsuario],
    consultarResultado
);
router.post(
    "/finalizarOrden", [validarJWT, validaAccesoUsuario],
    finalizarOrden
);
router.post(
    "/registrarResultado", [validarJWT, validaAccesoUsuario],
    registrarResultado
);
router.post(
    "/solicitarOrden", [validarJWT, validaAccesoUsuario],
    solicitarOrden
);
router.post(
    "/solicitarOrdenGAD", [validarJWT, validaAccesoUsuario],
    solicitarOrdenGAD
);
router.post("/validarOrden", [validarJWT, validaAccesoUsuario], validarOrden);
router.post(
    "/verificarOrden", [validarJWT, validaAccesoUsuario],
    verificarOrden
);

//**Borrar */
router.post("/ACCESO", ACCESOWS);

module.exports = router;