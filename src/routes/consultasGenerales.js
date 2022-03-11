const config = require('../configs/config');
const { Router, request, response } = require('express');
const { result } = require('underscore');
const router = Router();
const strongSoap = require('strong-soap').soap

router.get('/consultarVehiculo/:placa', (req, res) => {
    const { placa } = req.params;
    const url = config.WSDL_INFRACCIONES;
    const requestArgs = { placa: placa }

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

});



module.exports = router;