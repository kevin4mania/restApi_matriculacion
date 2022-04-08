const config = require("../configs/config");
const strongSoap = require("strong-soap").soap;
const axios = require("axios");

const rtv = async(req, res) => {
    const { placa } = req.params;
    const url = config.WSDL_RTV;
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

const consultaVehiculoPlaca = async(req, res) => {
    const { tipo, valor } = req.body;
    // console.log(`${config.WSDL_RTV_A}/find/${tipo}/${valor}`);
    await axios
        .get(`${config.WSDL_RTV_A}/find/${tipo}/${valor}`)
        .then((response) => {
            res.json({
                data: response.data
            });
        })
        .catch((error) => {
            console.log(error);
        });
};
const saveVehiculo = async(req, res) => {
    const data = req.body
        // console.log("DATA-->", data);
    await axios
        .post(`${config.WSDL_RTV_A}/save`, data)
        .then((response) => {
            res.json({
                data: response.data
            });
        })
        .catch((error) => {
            console.log(error);
        });
}
const anularOrden = async(req, res) => {
    const url = config.WSDL_RTV;
    const requestArgs = { orden: req.body };

    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };

    const options = {};

    strongSoap.createClient(url, options, function(err, client) {
        const method = client["anularOrden"];

        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["exito"] == 'N') {
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
const consultarResultado = async(req, res) => {
    const url = config.WSDL_RTV;
    const requestArgs = req.body;

    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };

    const options = {};

    strongSoap.createClient(url, options, function(err, client) {
        const method = client["consultarResultado"];

        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["resultado"]["codError"] == '-1') {
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
const finalizarOrden = async(req, res) => {
    const url = config.WSDL_RTV;
    const requestArgs = { orden: req.body };
    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };
    const options = {};
    strongSoap.createClient(url, options, function(err, client) {
        const method = client["finalizarOrden"];
        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["resultado"]["codError"] == '-1') {
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
const registrarResultado = async(req, res) => {
    const url = config.WSDL_RTV;
    const requestArgs = { DetalleResultado: req.body };

    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };

    const options = {};

    strongSoap.createClient(url, options, function(err, client) {
        const method = client["registrarResultado"];

        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["codError"] == '-1') {
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
const solicitarOrden = async(req, res) => {
    const url = config.WSDL_RTV;
    const requestArgs = { orden: req.body };

    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };

    const options = {};

    strongSoap.createClient(url, options, function(err, client) {
        const method = client["solicitarOrden"];

        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["resultado"]["codError"] == '-1') {
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
const solicitarOrdenGAD = async(req, res) => {
    const url = config.WSDL_RTV;
    const requestArgs = { orden: req.body };

    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };

    const options = {};

    strongSoap.createClient(url, options, function(err, client) {
        const method = client["solicitarOrdenGAD"];

        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["resultado"]["codError"] == '-1') {
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
const validarOrden = async(req, res) => {
    const url = config.WSDL_RTV;
    const requestArgs = { orden: req.body };

    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };

    const options = {};

    strongSoap.createClient(url, options, function(err, client) {
        const method = client["validarOrden"];

        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["exito"] == 'N') {
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
const verificarOrden = async(req, res) => {
    const url = config.WSDL_RTV;
    const requestArgs = { orden: req.body };

    const soapHeader = {
        username: config.USERNAME,
        password: config.PASSWORD,
    };

    const options = {};

    strongSoap.createClient(url, options, function(err, client) {
        const method = client["verificarOrden"];

        method(
            requestArgs,
            function(err, result, envelope, soapHeader) {
                if (err) {
                    res.json({ codRetorno: "0010", retorno: err });
                } else {
                    if (result["return"]["codError"] == '-1') {
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


//*** */

const ACCESOWS = async(req, res) => {
    try {
        const { funcionAcceso, data } = req.body;
        const url = config.WSDL_RTV;
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

module.exports = {
    rtv,
    consultaVehiculoPlaca,
    saveVehiculo,
    ACCESOWS,
    anularOrden,
    consultarResultado,
    finalizarOrden,
    registrarResultado,
    solicitarOrden,
    solicitarOrdenGAD,
    validarOrden,
    verificarOrden
};