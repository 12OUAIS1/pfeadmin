const router = require("express").Router();
const Carte = require("../models/Carte");
const User = require("../models/User");
// add crad barid el djazaier mission we did it to ttest the website
router.post("/cards", async (req, res) => {
    try {
        const { serie, amount, pin, exp, id } = req.body;
        const existUser = await User.findById(id);
        if (existUser) {
            const newCarte = new Carte({ serie, amount, pin, exp, user: existUser._id });
            await newCarte.save();
            existUser.carte.push(newCarte._id);
            await existUser.save();
            res.status(200).json({ carte: newCarte });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
// using the banq card 
router.post("/usecards", async (req, res) => {
    try {
        const { serie, exp, amount } = req.body;
        const card = await Carte.findOne({ serie });

        if (!card) {
            return res.status(200).json({ message: "Card not found" });
        }

        const reqExp = exp.trim(); // Trim whitespace from request expiration
        const cardExp = String(card.exp).trim(); // Convert card expiration to string and trim whitespace

        console.log('Request expiration:', reqExp);
        console.log('Card expiration:', cardExp);

        // Compare trimmed expiration values
        const isExpCorrect = reqExp === cardExp;

        console.log('Is expiration correct?', isExpCorrect);

        if (!isExpCorrect) {
            return res.status(200).json({ message: "Invalid expiration" });
        }

        // Check if the amount entered by the user is less than or equal to the original amount
        if (amount > card.amount) {
            return res.status(200).json({ message: "Insufficient amount" });
        }

        // Subtract the amount entered by the user from the original amount
        card.amount -= amount;
        await card.save();

        // Find the corresponding Offre and add the subtracted amount to its 'creadit' field
        const offre = await Offre.findOneAndUpdate(
            { numberr: card.pin }, // Assuming 'numberr' in Offre corresponds to 'pin' in Carte
            { $inc: { creadit: amount } }, // Increment 'creadit' by the 'amount'
            { new: true }
        );

        return res.status(200).json({ card, offre });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});


module.exports = router;
