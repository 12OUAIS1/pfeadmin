const router = require("express").Router();
const Offre = require("../models/Offre");
const User = require("../models/User");
// add crad barid el djazaier mission we did it to ttest the website
router.post("/offre", async (req, res) => {
    try {
        const { namee, numberr,creadit,offre, net, days, id } = req.body;
        const existUser = await User.findById(id);
        if (existUser) {
            // Check if the number starts with "066" and has exactly 10 digits
            const validNumberRegex = /^06\d{8}$/;
            if (!validNumberRegex.test(numberr)) {
                return res.status(400).json({ message: "Invalid phone number format. Please provide a phone number starting with '066' and having exactly 10 digits." });
            }

            // Check if the user already has an offer
            const existingOffre = await Offre.findOne({ user: existUser._id });
            if (existingOffre) {
                return res.status(400).json({ message: "User already has an offer" });
            }

            const newOffre = new Offre({ namee, numberr,creadit, offre, net, days, user: existUser._id });
            await newOffre.save();
            existUser.offre.push(newOffre._id);
            await existUser.save();
            res.status(200).json({ offre: newOffre });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
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
