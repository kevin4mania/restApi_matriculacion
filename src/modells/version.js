const version = async(req, res) => {
    const datos = {
        "name": "Api to MATRICULACION",
        "website": "MATRICULACION-AMT",
        "v1.0": "2022-03-21",
    }
    res.json(datos);
};

module.exports = {
    version
}