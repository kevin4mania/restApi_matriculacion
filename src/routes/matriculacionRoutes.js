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
    actualizarBeneficiario
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
        // check("tipoConsulta", "el tipoConsulta es obligatorio").not().isEmpty(),
        // check("valorConsulta", "el valorConsulta es obligatoria").not().isEmpty(),
        // validarJWT,
        // validarCampos,
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
    "/validarBloqueosProc/:idTramiteAnt", [
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
    "/actualizarBeneficiario", [
        // validarJWT,
        validarCampos,
        // validaAccesoUsuario,
    ],
    actualizarBeneficiario
);


module.exports = router;