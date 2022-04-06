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
//**Borr */

// router.get("/BconsultarTransPla", pruebaXMLTrans);
router.post("/ACCESO", ACCESOWS);

module.exports = router;