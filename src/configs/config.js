module.exports = {
    cors_ip: "http://localhost:5000",
    WSDL_INFRACCIONES: "http://172.20.68.16:8080/WSConsumosInfraccionesANT/WSConsumosInfraccionesSegANT?WSDL",
    WSDL_CONSULTAS_GENERALES: "https://serviciogads.ant.gob.ec:7081/WSConsultasGenerales/WSConsultasGenerales?WSDL",
    WSDL_RTV: "https://serviciogads.ant.gob.ec:7081/WSRtv/WSRTV?wsdl",
    //WSDL_MATRICULACION: "https://172.20.68.16:8080/WSMatriculacion/WSMatriculacion?WSDL",
    WSDL_MATRICULACION: "https://serviciogads.ant.gob.ec:7081/WSMatriculacion/WSMatriculacion?WSDL",
    WSDL_SOAP: "http://172.22.0.108/MDMQ_VehiculosService/VehiculosService.svc?wsdl",
    // WSDL_RTV_A: "http://172.20.68.36:9081/api_gadsRtv/vehiculo",
    WSDL_RTV_A: "http://192.168.1.119:10061/testapi_gadsRtv/vehiculo",
    REST_API_MAIL: "http://186.47.204.233:5000/api/mail",
    PORT: "5001",
    ID_EMPRESA: "50",
    SECRET: "amt2020",
    PASSWORD: "$A4T201%", //para ANT
    USERNAME: "AMTQUITMAT", //para ANT
    // TOKENTIME: '4h', // tiempo en horas
    TOKENTIME: 60 * 60 * 24,
    JWT_KEY: "haJSHdjksh!!1i27@askjdhm2nasa21A",
};