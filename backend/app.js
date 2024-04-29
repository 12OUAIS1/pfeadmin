const express = require("express");
const app = express();
const auth = require("./routes/auth");
const card = require("./routes/carte");
const offre = require("./routes/offre");
const reclamation = require("./routes/reclamation");
const admin = require("./routes/admin");
const image = require("./routes/image")
const cors = require('cors'); 
app.use("/uploads",express.static("./uploads"))
require("./cnx/cnx");
app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.send("hello")
});
 
app.use("/api/v1", auth);
app.use("/api/v2",card);
app.use("/api/v3",offre);
app.use("/api/v4",reclamation);
app.use("/api/v5",admin);
app.use("/api/v6",image);

app.listen(2000,() => {
  console.log("started");
}
);