const mongoose = require("mongoose");
const cnx = async(req,res) =>{
try {
    await mongoose.connect("mongodb://choucharouais:chouais1243@ac-7rbcnrb-shard-00-00.lzyjfx0.mongodb.net:27017,ac-7rbcnrb-shard-00-01.lzyjfx0.mongodb.net:27017,ac-7rbcnrb-shard-00-02.lzyjfx0.mongodb.net:27017/?replicaSet=atlas-pjuuux-shard-0&ssl=true&authSource=admin")
.then(() => {
    console.log("connected");});
} catch (error) {
    res.status(400).json({message: "not connected"});
}
};
cnx();