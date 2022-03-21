const config = require('../configs/config');
const strongSoap = require('strong-soap').soap

const consultar = async(req, res) => {

    const { placa } = req.params;
    const url = config.WSDL_INFRACCIONES;
    const requestArgs = { placa }

    const soapHeader = {
        'username': config.USERNAME,
        'password': config.PASSWORD
    };

    const options = {};

    strongSoap.createClient(url, options, function(err, client) {

        const method = client['consultarVehiculo'];

        method(requestArgs, function(err, result, envelope, soapHeader) {

            if (err) {
                res.json({ 'codRetorno': '0010', 'retorno': err });
            } else {
                if (result['return']['resultado']['codError'] == 0) {
                    res.json({ 'codRetorno': '0001', 'retorno': result['return'] });
                } else {
                    res.json({ 'codRetorno': '0010', 'retorno': result['return']['resultado'] });
                }
            }
        }, null, soapHeader);
    });


}


module.exports = {
    consultar
}