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

module.exports = {
    rtv,
    consultaVehiculoPlaca,
    saveVehiculo
};