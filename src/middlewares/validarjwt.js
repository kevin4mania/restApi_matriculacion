const jwt = require('jsonwebtoken');
const config = require('../configs/config');

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.json({
            ok: false,
            codError: "0002",
            msg: 'No hay token en la petición'
        });
    }
    try {
        const { usuario } = jwt.verify(token, config.JWT_KEY);
        req.usuario = usuario.id;
        // const token = jwt.verify(token, config.JWT_KEY);
        // console.log("TOKEN ***>", jwt.verify(token, config.JWT_KEY));
        next();
    } catch (error) {
        return res.json({
            codError: "999",
            ok: false,
            msg: 'Token no válido'
        })
    }
}
module.exports = {
    validarJWT
}