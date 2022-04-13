const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.json({
            ok: false,
            codError: "0002",
            msg: "Ingrese todos los campos solicitados",
            errors: errores.mapped()
        });
    }
    next();
}

module.exports = {
    validarCampos
}