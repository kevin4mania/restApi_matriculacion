const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCamposUsuario");

const { validarJWT } = require("../middlewares/validarjwt");
const { validaAccesoUsuario } = require("../middlewares/validaAccesoUsuario");
const {
    matriculacion,
    consultarVehiculoNuevo,
    actualizarDatosVehPro,
    consultarTransPla,
    validarBloqueosProc,
    consultarSolPlaca,
    actualizarBeneficiario,
    // pruebaXMLTrans,
    actualizarDatosVeh,
    actualizarMovAnt,
    actualizarPersona,
    bajarAutomotor,
    cambiarCaracteristicas,
    cambiarPropietario,
    cambiarServicio,
    consultarMovXProceso,
    consultarXmlCertificado,
    crearOrdenFabricacion,
    devolverIncidente,
    finalizarIncidente,
    generaPlacaPerdida,
    nuevoServicio,
    reemplazarPlaca,
    registrarAutomotor,
    registrarBloqueo,
    registrarCertificado,
    registrarDocTramite,
    renovarServicio,
    solicitarPlaca,
    verificacionChasisMotor,
    registrarIncidente,
    ACCESOWS
} = require("../controllers/matriculacionController");

const router = Router();

router.post(
    "/matriculacion/:placa", [validarJWT, validaAccesoUsuario],
    matriculacion
);
router.post(
    "/consultarVehiculoNuevo", [
        check("tipoConsulta", "el tipoConsulta es obligatorio").not().isEmpty(),
        check("valorConsulta", "el valorConsulta es obligatoria").not().isEmpty(),
        validarJWT,
        validarCampos,
        validaAccesoUsuario,
    ],
    consultarVehiculoNuevo
);

router.post(
    "/actualizarDatosVehPro", [
        validarJWT,
        validaAccesoUsuario,
    ],
    actualizarDatosVehPro
);
router.get(
    "/consultarTransPla/:idTramiteAnt", [
        validarJWT,
        validaAccesoUsuario,
    ],
    consultarTransPla
);
router.get(
    "/consultarSolPlaca/:idTramiteAnt", [
        validarJWT,
        validaAccesoUsuario,
    ],
    consultarSolPlaca
);
router.post(
    "/actualizarBeneficiario", [
        validarJWT,
        validaAccesoUsuario,
    ],
    actualizarBeneficiario
);

router.post(
    "/validarBloqueosProc", [
        validarJWT,
        validaAccesoUsuario,
    ],
    validarBloqueosProc
);

router.post(
    "/actualizarDatosVeh", [
        validarJWT,
        validaAccesoUsuario,
    ],
    actualizarDatosVeh
);

router.post(
    "/actualizarMovAnt", [
        validarJWT,
        validaAccesoUsuario,
    ],
    actualizarMovAnt
);

router.post(
    "/actualizarPersona", [
        validarJWT,
        validaAccesoUsuario,
    ],
    actualizarPersona
);
router.post(
    "/bajarAutomotor", [
        validarJWT,
        validaAccesoUsuario,
    ],
    bajarAutomotor
);
router.post(
    "/cambiarCaracteristicas", [
        validarJWT,
        validaAccesoUsuario,
    ],
    cambiarCaracteristicas
);
router.post(
    "/cambiarPropietario", [
        validarJWT,
        validaAccesoUsuario,
    ],
    cambiarPropietario
);
router.post(
    "/cambiarServicio", [
        validarJWT,
        validaAccesoUsuario,
    ],
    cambiarServicio
);
router.post(
    "/consultarMovXProceso", [
        validarJWT,
        validaAccesoUsuario,
    ],
    consultarMovXProceso
);
router.post(
    "/consultarXmlCertificado", [
        validarJWT,
        validaAccesoUsuario,
    ],
    consultarXmlCertificado
);
router.post(
    "/crearOrdenFabricacion", [
        validarJWT,
        validaAccesoUsuario,
    ],
    crearOrdenFabricacion
);
router.post(
    "/devolverIncidente", [
        validarJWT,
        validaAccesoUsuario,
    ],
    devolverIncidente
);
router.post(
    "/finalizarIncidente", [
        validarJWT,
        validaAccesoUsuario,
    ],
    finalizarIncidente
);
router.post(
    "/generaPlacaPerdida", [
        validarJWT,
        validaAccesoUsuario,
    ],
    generaPlacaPerdida
);
router.post(
    "/nuevoServicio", [
        validarJWT,
        validaAccesoUsuario,
    ],
    nuevoServicio
);
router.post(
    "/reemplazarPlaca", [
        validarJWT,
        validaAccesoUsuario,
    ],
    reemplazarPlaca
);
router.post(
    "/registrarAutomotor", [
        validarJWT,
        validaAccesoUsuario,
    ],
    registrarAutomotor
);
router.post(
    "/registrarBloqueo", [
        validarJWT,
        validaAccesoUsuario,
    ],
    registrarBloqueo
);
router.post(
    "/registrarCertificado", [
        validarJWT,
        validaAccesoUsuario,
    ],
    registrarCertificado
);
router.post(
    "/registrarDocTramite", [
        validarJWT,
        validaAccesoUsuario,
    ],
    registrarDocTramite
);
router.post(
    "/registrarIncidente", [
        validarJWT,
        validaAccesoUsuario,
    ],
    registrarIncidente
);
router.post(
    "/renovarServicio", [
        validarJWT,
        validaAccesoUsuario,
    ],
    renovarServicio
);
router.post(
    "/solicitarPlaca", [
        validarJWT,
        validaAccesoUsuario,
    ],
    solicitarPlaca
);
router.post(
    "/verificacionChasisMotor", [
        validarJWT,
        validaAccesoUsuario,
    ],
    verificacionChasisMotor
);
/*
router.post(
    "/", [
        // check("fecha", "la fecha es obligatoria").not().isEmpty(),
        // check("placa", " la placaes obligatoria").not().isEmpty(),
        // check("proceso", " el proceso obligatorio").not().isEmpty(),
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    registrarIncidente
);
*/
//**Borr */

// router.get("/BconsultarTransPla", pruebaXMLTrans);
router.post("/ACCESO", ACCESOWS);

module.exports = router;