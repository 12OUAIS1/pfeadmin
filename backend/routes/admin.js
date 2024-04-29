const express = require("express");
const router = express.Router();
const multer = require("multer");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");

// Multer configuration for image upload
/*const imgConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`);
    }
});

// Filter for image files
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true);
    } else {
        callback(new Error("Only images are allowed"));
    }
};

const upload = multer({
    storage: imgConfig,
    fileFilter: isImage
}).single("photo");

// Admin Sign-Up route
router.post("/admin/signup", upload, async (req, res) => {
    try {
        const { email, password, nom_complet, phone, address, idNumber, rank, badgeNumber } = req.body;
        const photo = req.file ? req.file.filename : ''; // Get uploaded photo filename

        // Check if required fields are provided
        if (!email || !password || !nom_complet || !phone || !address || !idNumber || !rank || !badgeNumber) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }

        // Check if admin with the same email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists with this email" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin instance
        const admin = new Admin({
            email,
            password: hashedPassword,
            nom_complet,
            phone,
            address,
            idNumber,
            rank,
            badgeNumber,
            photo
        });

        // Save admin to database
        const savedAdmin = await admin.save();

        res.status(201).json({ message: "Admin signed up successfully", admin: savedAdmin });
    } catch (error) {
        console.error("Error signing up admin:", error);
        res.status(500).json({ message: "Error signing up admin" });
    }
});*/


/*router.post("/admin/signup", async (req, res) => {
    try {
        const { emaila, password, nom_complet } = req.body;
        const existingAdmin = await Admin.findOne({ emaila });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists with this email" });
        }
        const salt = bcrypt.genSaltSync(10);
        const hashpass = bcrypt.hashSync(password, salt);
        const admin = new Admin({ emaila, password: hashpass, nom_complet });
        const savedAdmin = await admin.save();
        res.status(201).json({ admin: savedAdmin });
    } catch (error) {
        console.error("Error signing up admin:", error.message);
        res.status(500).json({ message: "Error signing up admin", error: error.message });
    }
});*/

// Admin Login
router.post("/admin/login", async (req, res) => {
    try {
        const { emaila, password } = req.body;
        const admin = await Admin.findOne({ emaila });
        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "Login successful", admin });
    } catch (error) {
        console.error("Error logging in admin:", error.message);
        res.status(500).json({ message: "Error logging in admin", error: error.message });
    }
});

// Get Admin Profile
router.get("/admin/profile", async (req, res) => {
    try {
        // Assuming you have authentication middleware that verifies the admin's token
        const admin = await Admin.findById(req.user.id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ admin });
    } catch (error) {
        console.error("Error fetching admin profile:", error.message);
        res.status(500).json({ message: "Error fetching admin profile", error: error.message });
    }
});

module.exports = router;
