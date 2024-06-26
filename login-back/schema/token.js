import mongoose from 'mongoose';

// Definición del esquema de Token usando mongoose.Schema
const TokenSchema = new mongoose.Schema({
    id: {type: Object},
    token: {type: String, required: true},
});

// Creación del modelo Token basado en el esquema TokenSchema
const Token = mongoose.model("Token", TokenSchema);
export default Token;