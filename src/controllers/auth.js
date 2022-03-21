const { generarJWT } = require('../helpers/jwt');

const usuario = async(req, res) => {
    const user = {
        id: 1,
        nombre: 'Andres',
        email: 'andreeslp96@gmail.com'
    }
    const token = await generarJWT(user);
    res.json({
        ok: '0001',
        user,
        token
    })

}
module.exports = {
    usuario
}