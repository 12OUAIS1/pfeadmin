const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    emaila: {
        type: String,
        unique: true,
        required: true,
    },
 
    password: {
        type: String, // Change the type to String
        unique: true,
        required: true,
    },
    nom_complet: {
        type: String,
        unique: true,
        required: true,
    },
   
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);
