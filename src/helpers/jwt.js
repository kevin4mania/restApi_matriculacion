const jwt = require('jsonwebtoken');
const config = require('../configs/config');


const generarJWT = (usuario) => {

    return new Promise((resolve, reject) => {

        const payload = { usuario };

        jwt.sign(payload, config.JWT_KEY, {
            expiresIn: config.TOKENTIME,
        }, (err, token) => {

            if (err) {
                // no se pudo crear el token
                reject('No se pudo generar el JWT');

            } else {
                // TOKEN!
                resolve(token);
            }

        })

    });


}


module.exports = {
    generarJWT
}