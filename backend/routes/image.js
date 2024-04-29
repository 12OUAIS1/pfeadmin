const express = require("express");
const Image = require("../models/Image");
const router = express.Router();
router.post("/image", async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Log request body
        const { imgUrl } = req.body;
        if (!imgUrl) {
            res.status(400).json({ success: false, error: "imgUrl is required" });
            return;
        }
        const image = await Image.create({ imgUrl });
        console.log("Saved Image:", image); // Log saved image
        res.status(201).json({ success: true, image });
    } catch (error) {
        console.log("Error:", error); // Log any errors
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

module.exports = router;