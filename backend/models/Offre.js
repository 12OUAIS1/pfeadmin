const mongoose = require("mongoose");
const offreSchema = new mongoose.Schema(
    {
      namee: {
        type: String,
        unique: true,
        required: true,
    },
    numberr: {
        type: Number,
        unique: true,
        required: true,
    },
    creadit: {
      type: Number,
      unique: true,
      required: true,
  },
      offre:{
        type: String,
        required:true,
      } ,
      net:{
        type: Number,
        required:true,
      },
      days:{
        type: Date,
        required:true,
      }  ,
      user: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    ],
    })
module.exports = mongoose.model("Offre",offreSchema);