const mongoose = require("mongoose");
const reclamationSchema = new mongoose.Schema(
    {
      nomcomplet: {
        type: String,
       
        required: true,
    },
    numero: {
        type: Number,
       
        required: true,
    },
    issue: {
      type: String,
     
      required: true,
  },
      state:{
        type: String,
        
      } ,
      response:{
        type: String,
        
      },
      user: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    ],
    })
module.exports = mongoose.model("Reclamation",reclamationSchema);