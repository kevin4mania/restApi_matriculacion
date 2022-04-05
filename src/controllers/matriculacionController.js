const config = require("../configs/config");
const strongSoap = require("strong-soap").soap;

const matriculacion = async(req, res) => {
    // console.log("Vehiculo");
    const { placa } = req.params;
    const url = config.WSDL_INFRACCIONES;
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
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"]["resultado"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
};

const consultarVehiculoNuevo = async(req, res) => {
    const { tipoConsulta, valorConsulta } = req.body;
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { tipoConsulta, valorConsulta };

    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };

    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        console.log("Cliente->", client);

        const method = client["consultarVehiculoNuevo"];

        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    console.log(result);
                    if (result["return"]["resultado"]["codError"] == 0) {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"]["resultado"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
};

const actualizarDatosVehPro = async(req, res) => {
    // const { tipoConsulta, valorConsulta } = req.body;
    const url = config.WSDL_MATRICULACION;
    const requestArgs = req.body;
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        console.log("Cliente->", client);
        const method = client["actualizarDatosVehiculo"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    console.log(result);
                    if (result["return"]["resultado"]["codError"] == 0) {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"]["resultado"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
};

const consultarTransPla = async(req, res) => {
    const { idTramiteAnt } = req.params;
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { idTramiteAnt };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        console.log("Cliente->", client);
        const method = client["consultarTransPla"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    console.log(result);
                    if (result["return"]["resultado"]["codError"] == 0) {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"]["resultado"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
};

const consultarSolPlaca = async(req, res) => {
    const { idTramiteAnt } = req.params;
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { idTramiteAnt };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        console.log("Cliente->", client);
        const method = client["consultarSolPlaca"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    console.log(result);
                    if (result["return"]["resultado"]["codError"] == 0) {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"]["resultado"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
};

const validarBloqueosProc = async(req, res) => {
    const { fecha, placa, proceso } = req.body;
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { fecha, placa, proceso };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        console.log("Cliente->", client);
        const method = client["validarBloqueosProc"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    console.log(result);
                    if (result["return"]["resultado"]["codError"] == 0) {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"]["resultado"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
};

const actualizarBeneficiario = async(req, res) => {
    const url = config.WSDL_INFRACCIONES;
    const requestArgs = req.body;

    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };

    const options = {};

    strongSoap.createClient(url, options, function(err, client) {
        const method = client["actualizarBeneficiario"];

        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["resultado"]["codError"] == 0) {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"]["resultado"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
}

module.exports = {
    matriculacion,
    consultarVehiculoNuevo,
    actualizarDatosVehPro,
    consultarTransPla,
    consultarSolPlaca,
    validarBloqueosProc,
    actualizarBeneficiario

};