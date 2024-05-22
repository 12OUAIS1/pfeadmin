const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");




router.post("/admin/signup", async (req, res) => {
    try {
        const { email, password, nom_complet, phone, address, idNumber, rank, badgeNumber, imgUrl } = req.body;

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists with this email" });
        }

        // Check if imgUrl is provided
        if (!imgUrl) {
            return res.status(400).json({ success: false, error: "imgUrl is required" });
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashpass = bcrypt.hashSync(password, salt);

        // Create the admin
        const admin = new Admin({ 
            email, 
            password: hashpass, 
            nom_complet, 
            phone, 
            address, 
            idNumber, 
            rank, 
            badgeNumber, 
            imgUrl 
        });
        const savedAdmin = await admin.save();

        // Send response
        res.status(201).json({ success: true, admin: savedAdmin });
    } catch (error) {
        console.error("Error signing up admin:", error.message);
        res.status(500).json({ message: "Error signing up admin", error: error.message });
    }
});

// Admin Login
router.post("/admin/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
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
router.get("/admin/:id", async (req, res) => {
    try {
      // Check if req.params.id is null or undefined
      if (!req.params.id) {
        return res.status(400).json({ message: "ID parameter is missing" });
      }
  
      const admin = await Admin.findById(req.params.id);
      if (!admin) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(admin);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });
  

module.exports = router;
router.get("/admin", async (req, res) => {
    try {
        const users = await Admin.find();
        res.status(200).json({ users });
    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
});

router.delete("/deleteadmin/:adminId", async (req, res) => {
    try {
        const adminId = req.params.adminId;

        const deletedAdmin = await Admin.findByIdAndDelete(adminId);

        if (!deletedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json({ message: "Admin deleted successfully", admin: deletedAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Update admin record by ID
router.put("/updateadmin/:adminId", async (req, res) => {
    try {
        const { email, nom_complet, phone, address } = req.body;
        const adminId = req.params.adminId;

        console.log('Admin ID:', adminId); // Log adminId for debugging

        // Find the admin by ID
        const admin = await Admin.findById(adminId);

        // Check if the admin exists
        if (!admin) {
            console.log('Admin not found'); // Log if admin not found
            return res.status(404).json({ message: "Admin not found" });
        }

        // Update the admin fields
        admin.email = email;
        admin.nom_complet = nom_complet;
        admin.phone = phone;
        admin.address = address;
        

        // Save the updated admin
        const updatedAdmin = await admin.save();

        // Send response with the updated admin
        res.status(200).json({ admin: updatedAdmin });
    } catch (error) {
        console.error('Error updating admin data:', error); // Log detailed error
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

module.exports = router;
