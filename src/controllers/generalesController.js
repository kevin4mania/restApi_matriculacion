const config = require("../configs/config");
const strongSoap = require("strong-soap").soap;

const consultarVehiculo = async(req, res) => {
    // console.log("Vehiculo");
    // PCS5742
    // PLK3492
    // PAB3359
    const { placa } = req.params;
    const url = config.WSDL_CONSULTAS_GENERALES;
    const requestArgs = { placa };

    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };

    const options = {};

    strongSoap.createClient(url, options, function(err, client) {
        const method = client["consultarVehiculo"];

        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["resultado"]["codError"] == 0) {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({ codRetorno: "0010", retorno: result["return"]["resultado"] });
                    }
                }
            },
            null,
            soapHeader
        );
    });
};

const consultarBloqueos = async(req, res) => {
    // console.log("Bloqueo");
    // KMM0202
    // LBA8869
    // GCK0432
    const { placa } = req.params;
    const url = config.WSDL_CONSULTAS_GENERALES;
    const requestArgs = { placa };

    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };

    const options = {};

    strongSoap.createClient(url, options, function(err, client) {
        const method = client["consultarBloqueos"];

        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    // console.log(result);
                    // console.log(result["return"]["bloqueo"]);

                    if (result["return"]["resultado"] == undefined) {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        if (result["return"]["resultado"]["codError"] == 0) {
                            res.json({ codRetorno: "0001", retorno: result["return"] });
                        } else {
                            res.json({ codRetorno: "0010", retorno: result["return"]["resultado"] });
                        }
                    }
                }
            },
            null,
            soapHeader
        );
    });
};

const consultarHistorial = async(req, res) => {
    // console.log("Historial");
    // PCS5742
    // ABS0279
    // XBY0821
    const { placa } = req.params;
    const url = config.WSDL_CONSULTAS_GENERALES;
    const requestArgs = { placa };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["consultarHistorial"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    // console.log("Resultado", result);
                    if (result["return"]["resultado"] == 0) {
                        res.json({ codRetorno: "0001", retorno: result["return"]["resultado"] });
                    } else {
                        res.json({ codRetorno: "0010", retorno: result["return"]["propietario"] });
                    }
                }
            },
            null,
            soapHeader
        );
    });
};

const consultarLicencia = async(req, res) => {
    // console.log("Bloqueo");
    // WEB
    //"1400589527",
    // "CONSULTA",
    // 0717422000
    // 1717422321
    // AXISANT
    const { identificacion, canal, usuario } = req.body;
    const url = config.WSDL_CONSULTAS_GENERALES;
    const requestArgs = { identificacion, canal, usuario };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    console.log(requestArgs);
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["consultarLicencia"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    console.log("Resultado", result);
                    if (result["return"]["resultado"]["codError"] == 0) {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({ codRetorno: "0010", retorno: result["return"]["resultado"] });
                    }
                }
            },
            null,
            soapHeader
        );
    });
};

const consultarDeudas = async(req, res) => {
    // CED
    // 1717422321
    // PCS5742
    // 0400827631
    // VEH
    // 1718828781
    // PCH1989
    // CED
    // 0201443678
    // PBF6660
    const { tipoIdentificacion, identificacion, placa } = req.body;
    const url = config.WSDL_CONSULTAS_GENERALES;
    const requestArgs = { tipoIdentificacion, identificacion, placa };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    console.log(requestArgs);
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["consultarDeudas"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    console.log("Resultado", result);
                    if (result["return"]["resultado"]["codError"] == 0) {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({ codRetorno: "0010", retorno: result["return"]["resultado"] });
                    }
                }
            },
            null,
            soapHeader
        );
    });
};

module.exports = {
    consultarVehiculo,
    consultarBloqueos,
    consultarHistorial,
    consultarLicencia,
    consultarDeudas,
};