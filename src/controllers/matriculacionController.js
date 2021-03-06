const config = require("../configs/config");
const strongSoap = require("strong-soap").soap;
const { parseString } = require("xml2js");

const matriculacion = async(req, res) => {
    // console.log("Vehiculo");
    const { placa } = req.params;
    const url = config.WSDL_MATRICULACION;
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
    console.log("Consulta vehiculo nuevo");
    const { tipoConsulta, valorConsulta } = req.body;
    const url = config.WSDL_MATRICULACION;
    const requestArgs = {
        datos: {
            tipoConsulta,
            valorConsulta,
        },
    };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["consultarVehiculoNuevo"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    // console.log(result);
                    if (result["return"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"],
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
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { datos: req.body };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    console.log(requestArgs);
    strongSoap.createClient(url, options, function(err, client) {
        console.log("Cliente->", client);
        const method = client["actualizarDatosVehPro"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    // console.log(result);
                    if (result["return"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"],
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
    let XML_JSON;
    console.log("consulta trans pla");
    const { idTramiteAnt } = req.params;
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { idTramiteAnt };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        // console.log("Cliente->", client);
        const method = client["consultarTransPla"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        parseString(
                            result["return"]["mensaje"], { strict: false, trim: true },
                            (err, resultado) => {
                                XML_JSON = resultado;
                            }
                        );
                        res.json({
                            codRetorno: "0010",
                            exito: result["return"]["exito"],
                            retorno: XML_JSON,
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
    let XML_JSON;
    console.log("consulta sol pla");
    const { idTramiteAnt } = req.params;
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { idTramiteAnt };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        // console.log("Cliente->", client);
        const method = client["consultarSolPlaca"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        parseString(
                            result["return"]["mensaje"], { strict: false, trim: true },
                            (err, resultado) => {
                                XML_JSON = resultado;
                            }
                        );
                        res.json({
                            codRetorno: "0010",
                            exito: result["return"]["exito"],
                            retorno: XML_JSON,
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
    const requestArgs = { datos: { fecha, placa, proceso } };
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
                    if (result["return"]["bloqueado"] == 0) {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else if (result["return"]["resultado"]["codError"] == 1) {
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
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { datos: req.body };
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
                    if (result["return"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
};
const actualizarDatosVeh = async(req, res) => {
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { datos: req.body };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["actualizarDatosVeh"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
}
const actualizarMovAnt = async(req, res) => {
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { datos: req.body };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["actualizarMovAnt"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
};
const actualizarPersona = async(req, res) => {
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { datos: req.body };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["actualizarPersona"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
};
const bajarAutomotor = async(req, res) => {
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { datos: req.body };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["bajarAutomotor"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
};
const cambiarCaracteristicas = async(req, res) => {
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { servicio: req.body };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["cambiarCaracteristicas"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
};
const cambiarPropietario = async(req, res) => {
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { datos: req.body };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["cambiarPropietario"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
};
const cambiarServicio = async(req, res) => {
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { servicio: req.body };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["cambiarServicio"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
}
const consultarMovXProceso = async(req, res) => {
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { datos: req.body };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["consultarMovXProceso"]; //consultarMovXProceso
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
}

const consultarXmlCertificado = async(req, res) => {
    const url = config.WSDL_MATRICULACION;
    const requestArgs = req.body;
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["consultarXmlCertificado"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["resultado"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
}

const crearOrdenFabricacion = async(req, res) => {
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { datos: req.body };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["crearOrdenFabricacion"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["resultado"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
}

const devolverIncidente = async(req, res) => {
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { incidente: req.body };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["devolverIncidente"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
}

const finalizarIncidente = async(req, res) => {
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { incidente: req.body };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["finalizarIncidente"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
}
const generaPlacaPerdida = async(req, res) => {
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { datos: req.body };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["generaPlacaPerdida"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["resultado"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
}
const nuevoServicio = async(req, res) => {
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { servicio: req.body };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["nuevoServicio"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
}
const reemplazarPlaca = async(req, res) => {
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { servicio: req.body };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["reemplazarPlaca"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
}
const registrarAutomotor = async(req, res) => {
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { datos: req.body };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["registrarAutomotor"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["resultado"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
}
const registrarBloqueo = async(req, res) => {
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { datos: req.body };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["registrarBloqueo"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["resultado"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
}
const registrarCertificado = async(req, res) => {
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { certificado: req.body };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["registrarCertificado"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["resultado"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
}
const registrarDocTramite = async(req, res) => {
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { documento: req.body };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["registrarDocTramite"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
}
const registrarIncidente = async(req, res) => {
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { incidente: req.body };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["registrarIncidente"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["resultado"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
}
const renovarServicio = async(req, res) => {
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { servicio: req.body };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["renovarServicio"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
}
const solicitarPlaca = async(req, res) => {
    const url = config.WSDL_MATRICULACION;
    const requestArgs = { datos: req.body };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["solicitarPlaca"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["resultado"]["exito"] == "N") {
                        res.json({ codRetorno: "0001", retorno: result["return"] });
                    } else {
                        res.json({
                            codRetorno: "0010",
                            retorno: result["return"],
                        });
                    }
                }
            },
            null,
            soapHeader
        );
    });
}
const verificacionChasisMotor = async(req, res) => {
        const url = config.WSDL_MATRICULACION;
        const requestArgs = { servicio: req.body };
        const soapHeader = {
            username: config.USERNAME,
            password: config.PASSWORD,
        };
        const options = {};
        strongSoap.createClient(url, options, function(err, client) {
            const method = client["verificacionChasisMotor"];
            method(
                requestArgs,
                function(err, result, envelope, soapHeader) {
                    if (err) {
                        res.json({ codRetorno: "0010", retorno: err });
                    } else {
                        if (result["return"]["exito"] == "N") {
                            res.json({ codRetorno: "0001", retorno: result["return"] });
                        } else {
                            res.json({
                                codRetorno: "0010",
                                retorno: result["return"],
                            });
                        }
                    }
                },
                null,
                soapHeader
            );
        });
    }
    /*
    const c15 = async(req, res) => {
        const url = config.WSDL_MATRICULACION;
        const requestArgs = { datos: req.body };
        const soapHeader = {
            username: config.USERNAME,
            password: config.PASSWORD,
        };
        const options = {};
        strongSoap.createClient(url, options, function(err, client) {
            const method = client[""];
            method(
                requestArgs,
                function(err, result, envelope, soapHeader) {
                    if (err) {
                        res.json({ codRetorno: "0010", retorno: err });
                    } else {
                        if (result["return"]["resultado"]["exito"] == "N") {
                            res.json({ codRetorno: "0001", retorno: result["return"] });
                        } else {
                            res.json({
                                codRetorno: "0010",
                                retorno: result["return"],
                            });
                        }
                    }
                },
                null,
                soapHeader
            );
        });
    }
    */
    //**!--------------------------------------------- */
const axios = require("axios");
const pruebaXMLTrans = async(req, res) => {
    let XML_JSON;
    await axios
        .get(
            `http://172.20.68.52:5001/api/matriculacion/consultarTransPla/28122527`
        )
        .then((response) => {
            console.log(response.data);

            parseString(
                response.data.retorno.mensaje, { strict: false, trim: true },
                (err, resultado) => {
                    XML_JSON = resultado;
                }
            );
            res.json({
                codRetorno: "0010",
                retorno: XML_JSON,
            });
            // res.json({
            //     data: response,
            // });
        })
        .catch((error) => {
            console.log(error);
        });
};

const ACCESOWS = async(req, res) => {
    try {
        const { funcionAcceso, data } = req.body;
        const url = config.WSDL_MATRICULACION;
        const requestArgs = data;
        const soapHeader = {
            username: config.USERNAME,
            password: config.PASSWORD,
        };
        const options = {};
        strongSoap.createClient(url, options, function(err, client) {
            const method = client[funcionAcceso];
            method(
                requestArgs,
                function(err, result, envelope, soapHeader) {
                    if (err) {
                        res.json({ codRetorno: "0010", retorno: err });
                    } else {
                        res.json({
                            funcion: funcionAcceso,
                            data: requestArgs,
                            retorno: result["return"],
                        });
                    }
                },
                null,
                soapHeader
            );
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};
//**!--------------------------------------------- */

module.exports = {
    matriculacion,
    consultarVehiculoNuevo,
    actualizarDatosVehPro,
    consultarTransPla,
    consultarSolPlaca,
    validarBloqueosProc,
    actualizarBeneficiario,
    // pruebaXMLTrans,
    ACCESOWS,
    actualizarDatosVeh,
    actualizarMovAnt,
    actualizarPersona,
    bajarAutomotor,
    cambiarCaracteristicas,
    cambiarPropietario,
    cambiarServicio,
    consultarMovXProceso,
    consultarXmlCertificado,
    crearOrdenFabricacion,
    devolverIncidente,
    finalizarIncidente,
    generaPlacaPerdida,
    nuevoServicio,
    reemplazarPlaca,
    registrarAutomotor,
    registrarBloqueo,
    registrarCertificado,
    registrarDocTramite,
    registrarIncidente,
    renovarServicio,
    solicitarPlaca,
    verificacionChasisMotor
};