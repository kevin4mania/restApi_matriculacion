const { Schema, model } = require("mongoose");

const RegistroMetodoSchema = Schema({
    nombre: {
        type: String,
        require: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    observacion: {
        type: String,
        required: true,
    },
    URL: {
        type: String,
        required: true,
    },
    estadoRM: {
        type: Boolean,
        default: true,
    },
});

module.exports = model("RegistroMetodos", RegistroMetodoSchema);