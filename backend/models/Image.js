const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({

    imgUrl: {
        type: String, 
        
    }
}, { timestamps: true });

module.exports = mongoose.model("Image", imageSchema);
