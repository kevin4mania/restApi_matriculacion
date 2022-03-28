const config = require("../configs/config");
const strongSoap = require("strong-soap").soap;

const consultarInformacionVehiculo = async(req, res) => {
    // PDJ1560
    // TBE0198
    const { tipo, valor } = req.body;
    const url = config.WSDL_SOAP;
    const requestArgs = { tipo, valor };

    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };

    const options = {};
    // console.log(requestArgs);
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["ConsultarInformacionVehiculo"];

        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    // console.log("R:->", result);
                    if (result["ConsultarInformacionVehiculoResult"]["CodigoResultado"] == 0) {
                        res.json({ codRetorno: "0001", retorno: result["ConsultarInformacionVehiculoResult"] });
                    } else {
                        res.json({ codRetorno: "0010", retorno: result["ConsultarInformacionVehiculoResult"]["Mensaje"] });
                    }
                }
            },
            null,
            soapHeader
        );
    });
};

const calcularImpuestos = async(req, res) => {
    const { tipo, valor } = req.body;
    const url = config.WSDL_SOAP;
    const requestArgs = { tipo, valor };

    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };

    const options = {};
    // console.log(requestArgs);
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["CalcularImpuestos"];

        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    // console.log("R:->", result);
                    if (result["CalcularImpuestosResult"]["CodigoResultado"] == 0) {
                        res.json({ codRetorno: "0001", retorno: result["CalcularImpuestosResult"]["Impuestos"]["Impuesto"] });
                    } else {
                        res.json({ codRetorno: "0010", retorno: result["CalcularImpuestosResult"]["Mensaje"] });
                    }
                }
            },
            null,
            soapHeader
        );
    });
}

module.exports = {
    consultarInformacionVehiculo,
    calcularImpuestos
};