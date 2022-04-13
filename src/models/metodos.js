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
    online: {
        type: Boolean,
        default: true,
    },
});

MetodoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model("Metodo", MetodoSchema);