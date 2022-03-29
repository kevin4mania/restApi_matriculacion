const { Schema, model } = require("mongoose");

const MetodoSchema = Schema({
    idUsuario: {
        type: Schema.ObjectId,
        ref: "Usuario",
        require: true,
    },
    nombreMetodo: {
        type: String,
        required: true,
        // unique: true,
    },
    estado: {
        type: Boolean,
        default: true,
    },
});

module.exports = model("Metodo", MetodoSchema);