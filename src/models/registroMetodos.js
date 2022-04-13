const { Schema, model } = require("mongoose");

const RegistroMetodoSchema = Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        required: true,
    },
    observation: {
        type: String,
        required: true,
    },
    URL: {
        type: String,
        required: true,
    },
    online: {
        type: Boolean,
        default: true,
    },
});

module.exports = model("RegistroMetodos", RegistroMetodoSchema);