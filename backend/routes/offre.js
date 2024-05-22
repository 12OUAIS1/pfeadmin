const router = require("express").Router();
const Offre = require("../models/Offre");
const User = require("../models/User");
// add crad barid el djazaier mission we did it to ttest the website
router.post("/offre", async (req, res) => {
  try {
      console.log("Request Body:", req.body);
      const { namee, numberr, creadit, offre, net, days, id } = req.body;
      const existUser = await User.findById(id);
      if (!existUser) {
          return res.status(400).json({ message: "User not found" });
      }

      const validNumberRegex = /^06\d{8}$/;
      if (!validNumberRegex.test(numberr)) {
          return res.status(400).json({ message: "Invalid phone number format. Please provide a phone number starting with '06' and having exactly 10 digits." });
      }

      const existingOffre = await Offre.findOne({ user: existUser._id });
      if (existingOffre) {
          return res.status(400).json({ message: "User already has an offer" });
      }

      const newOffre = new Offre({ namee, numberr, creadit, offre, net, days, user: existUser._id });
      await newOffre.save();
      existUser.offre.push(newOffre._id);
      await existUser.save();
      res.status(200).json({ offre: newOffre });
  } catch (error) {
      console.error("Error creating offer:", error);
      return res.status(500).json({ message: "Failed to create offer", error: error.message });
  }
});

// Assuming you have a model for Offre imported as 'Offre'

router.get("/getoffre/:id", async (req, res) => {
    try {
      const offres = await Offre.find({ user: req.params.id });
      if (offres.length !== 0) {
        res.status(200).json({ offres });
      } else {
        res.status(200).json({ message: "No offers found for this user" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });
  

module.exports = router;
