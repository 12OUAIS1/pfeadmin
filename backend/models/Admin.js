const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    nom_complet: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    idNumber: {
        type: String,
        required: true,
    },
    rank: {
        type: String,
        required: true,
    },
    badgeNumber: {
        type: String,
        required: true,
    },
    photo: {
        type: String, 
        default:
            'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
    }
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);
