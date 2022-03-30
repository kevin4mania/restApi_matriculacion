const jwt = require('jsonwebtoken');
const config = require('../configs/config');

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }
    try {
        const { usuario } = jwt.verify(token, config.JWT_KEY);
        req.usuario = usuario.uid;
        // const token = jwt.verify(token, config.JWT_KEY);
        // console.log("TOKEN ***>", jwt.verify(token, config.JWT_KEY));
        next();
    } catch (error) {
        return res.status(403).json({
            msg: '0010',
            ok: false,
            msg: 'Token no válido'
        })
    }
}
module.exports = {
    validarJWT
}