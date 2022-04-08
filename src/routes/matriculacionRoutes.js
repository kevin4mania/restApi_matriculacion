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
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    consultarVehiculoNuevo
);

router.post(
    "/actualizarDatosVehPro", [
        // check("tipoConsulta", "el tipoConsulta es obligatorio").not().isEmpty(),
        // check("valorConsulta", "el valorConsulta es obligatoria").not().isEmpty(),
        // validarJWT,
        // validarCampos,
        // validaAccesoUsuario,
    ],
    actualizarDatosVehPro
);
router.get(
    "/consultarTransPla/:idTramiteAnt", [
        // validarJWT,
        // validaAccesoUsuario,
    ],
    consultarTransPla
);
router.get(
    "/consultarSolPlaca/:idTramiteAnt", [
        // check("tipoConsulta", "el tipoConsulta es obligatorio").not().isEmpty(),
        // check("valorConsulta", "el valorConsulta es obligatoria").not().isEmpty(),
        // validarJWT,
        // validarCampos,
        // validaAccesoUsuario,
    ],
    consultarSolPlaca
);
router.post(
    "/actualizarBeneficiario", [
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    actualizarBeneficiario
);

router.post(
    "/validarBloqueosProc", [
        check("fecha", "la fecha es obligatoria").not().isEmpty(),
        check("placa", " la placaes obligatoria").not().isEmpty(),
        check("proceso", " el proceso obligatorio").not().isEmpty(),
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    validarBloqueosProc
);

router.post(
    "/actualizarDatosVeh", [
        // check("fecha", "la fecha es obligatoria").not().isEmpty(),
        // check("placa", " la placaes obligatoria").not().isEmpty(),
        // check("proceso", " el proceso obligatorio").not().isEmpty(),
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    actualizarDatosVeh
);

router.post(
    "/actualizarMovAnt", [
        // check("fecha", "la fecha es obligatoria").not().isEmpty(),
        // check("placa", " la placaes obligatoria").not().isEmpty(),
        // check("proceso", " el proceso obligatorio").not().isEmpty(),
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    actualizarMovAnt
);

router.post(
    "/actualizarPersona", [
        // check("fecha", "la fecha es obligatoria").not().isEmpty(),
        // check("placa", " la placaes obligatoria").not().isEmpty(),
        // check("proceso", " el proceso obligatorio").not().isEmpty(),
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    actualizarPersona
);
router.post(
    "/bajarAutomotor", [
        // check("fecha", "la fecha es obligatoria").not().isEmpty(),
        // check("placa", " la placaes obligatoria").not().isEmpty(),
        // check("proceso", " el proceso obligatorio").not().isEmpty(),
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    bajarAutomotor
);
router.post(
    "/cambiarCaracteristicas", [
        // check("fecha", "la fecha es obligatoria").not().isEmpty(),
        // check("placa", " la placaes obligatoria").not().isEmpty(),
        // check("proceso", " el proceso obligatorio").not().isEmpty(),
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    cambiarCaracteristicas
);
router.post(
    "/cambiarPropietario", [
        // check("fecha", "la fecha es obligatoria").not().isEmpty(),
        // check("placa", " la placaes obligatoria").not().isEmpty(),
        // check("proceso", " el proceso obligatorio").not().isEmpty(),
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    cambiarPropietario
);
router.post(
    "/cambiarServicio", [
        // check("fecha", "la fecha es obligatoria").not().isEmpty(),
        // check("placa", " la placaes obligatoria").not().isEmpty(),
        // check("proceso", " el proceso obligatorio").not().isEmpty(),
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    cambiarServicio
);
router.post(
    "/consultarMovXProceso", [
        // check("fecha", "la fecha es obligatoria").not().isEmpty(),
        // check("placa", " la placaes obligatoria").not().isEmpty(),
        // check("proceso", " el proceso obligatorio").not().isEmpty(),
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    consultarMovXProceso
);
router.post(
    "/consultarXmlCertificado", [
        // check("fecha", "la fecha es obligatoria").not().isEmpty(),
        // check("placa", " la placaes obligatoria").not().isEmpty(),
        // check("proceso", " el proceso obligatorio").not().isEmpty(),
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    consultarXmlCertificado
);
router.post(
    "/crearOrdenFabricacion", [
        // check("fecha", "la fecha es obligatoria").not().isEmpty(),
        // check("placa", " la placaes obligatoria").not().isEmpty(),
        // check("proceso", " el proceso obligatorio").not().isEmpty(),
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    crearOrdenFabricacion
);
router.post(
    "/devolverIncidente", [
        // check("fecha", "la fecha es obligatoria").not().isEmpty(),
        // check("placa", " la placaes obligatoria").not().isEmpty(),
        // check("proceso", " el proceso obligatorio").not().isEmpty(),
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    devolverIncidente
);
router.post(
    "/finalizarIncidente", [
        // check("fecha", "la fecha es obligatoria").not().isEmpty(),
        // check("placa", " la placaes obligatoria").not().isEmpty(),
        // check("proceso", " el proceso obligatorio").not().isEmpty(),
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    finalizarIncidente
);
router.post(
    "/generaPlacaPerdida", [
        // check("fecha", "la fecha es obligatoria").not().isEmpty(),
        // check("placa", " la placaes obligatoria").not().isEmpty(),
        // check("proceso", " el proceso obligatorio").not().isEmpty(),
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    generaPlacaPerdida
);
router.post(
    "/nuevoServicio", [
        // check("fecha", "la fecha es obligatoria").not().isEmpty(),
        // check("placa", " la placaes obligatoria").not().isEmpty(),
        // check("proceso", " el proceso obligatorio").not().isEmpty(),
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    nuevoServicio
);
router.post(
    "/reemplazarPlaca", [
        // check("fecha", "la fecha es obligatoria").not().isEmpty(),
        // check("placa", " la placaes obligatoria").not().isEmpty(),
        // check("proceso", " el proceso obligatorio").not().isEmpty(),
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    reemplazarPlaca
);
router.post(
    "/registrarAutomotor", [
        // check("fecha", "la fecha es obligatoria").not().isEmpty(),
        // check("placa", " la placaes obligatoria").not().isEmpty(),
        // check("proceso", " el proceso obligatorio").not().isEmpty(),
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    registrarAutomotor
);
router.post(
    "/registrarBloqueo", [
        // check("fecha", "la fecha es obligatoria").not().isEmpty(),
        // check("placa", " la placaes obligatoria").not().isEmpty(),
        // check("proceso", " el proceso obligatorio").not().isEmpty(),
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    registrarBloqueo
);
router.post(
    "/registrarCertificado", [
        // check("fecha", "la fecha es obligatoria").not().isEmpty(),
        // check("placa", " la placaes obligatoria").not().isEmpty(),
        // check("proceso", " el proceso obligatorio").not().isEmpty(),
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    registrarCertificado
);
router.post(
    "/registrarDocTramite", [
        // check("fecha", "la fecha es obligatoria").not().isEmpty(),
        // check("placa", " la placaes obligatoria").not().isEmpty(),
        // check("proceso", " el proceso obligatorio").not().isEmpty(),
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    registrarDocTramite
);
router.post(
    "/registrarIncidente", [
        // check("fecha", "la fecha es obligatoria").not().isEmpty(),
        // check("placa", " la placaes obligatoria").not().isEmpty(),
        // check("proceso", " el proceso obligatorio").not().isEmpty(),
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    registrarIncidente
);
router.post(
    "/renovarServicio", [
        // check("fecha", "la fecha es obligatoria").not().isEmpty(),
        // check("placa", " la placaes obligatoria").not().isEmpty(),
        // check("proceso", " el proceso obligatorio").not().isEmpty(),
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    renovarServicio
);
router.post(
    "/solicitarPlaca", [
        // check("fecha", "la fecha es obligatoria").not().isEmpty(),
        // check("placa", " la placaes obligatoria").not().isEmpty(),
        // check("proceso", " el proceso obligatorio").not().isEmpty(),
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    solicitarPlaca
);
router.post(
    "/verificacionChasisMotor", [
        // check("fecha", "la fecha es obligatoria").not().isEmpty(),
        // check("placa", " la placaes obligatoria").not().isEmpty(),
        // check("proceso", " el proceso obligatorio").not().isEmpty(),
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    verificacionChasisMotor
);
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
//**Borr */

// router.get("/BconsultarTransPla", pruebaXMLTrans);
router.post("/ACCESO", ACCESOWS);

module.exports = router;