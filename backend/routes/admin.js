const router = require("express").Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

// Admin Sign-Up
router.post("/admin/signup", async (req, res) => {
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
});

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
