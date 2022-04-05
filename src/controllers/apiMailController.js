const config = require("../configs/config");
const axios = require("axios");

const envioEmail = async(req, res) => {
    const data = req.body;
    await axios
        .post(`${config.REST_API_MAIL}/send`, data)
        .then((response) => {
            res.json({
                data: response.data,
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

const envioEmailAdjuntos = async(req, res) => {
    const data = req.body;
    await axios
        .post(`${config.REST_API_MAIL}/sendAttachment`, data)
        .then((response) => {
            res.json({
                data: response.data,
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

module.exports = {
    envioEmail,
    envioEmailAdjuntos,
};