const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
 
    number: {
        type: Number, // Change the type to String
        unique: true,
        required: true,
    },
    numberu: {
        type: String,
        required: true,
    },
    offre: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "List",
    }],
    carte: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carte",
    }],
    reclamation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reclamation",
    }],
    verified: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);


