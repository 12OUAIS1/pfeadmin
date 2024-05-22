const router = require("express").Router();
const User = require("../models/User");
const Reclamation = require("../models/Reclamation");

router.post("/reclamation", async (req, res) => {
    try {
        const { nomcomplet, numero, issue,  id } = req.body;
        const existUser = await User.findById(id);
        if (existUser) {
            const newReclamation = new Reclamation({  nomcomplet, numero, issue, user: existUser._id });
            await newReclamation.save();
            existUser.reclamation.push(newReclamation._id);
            await existUser.save();
            res.status(200).json({ reclamation: newReclamation });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
router.put("/updaterec/:reclamationId", async (req, res) => {
    try {
        const { state,response} = req.body;
        const reclamationId = req.params.reclamationId;

        // Find the reclamation by ID
        const reclamation = await Reclamation.findById(reclamationId);

        // Check if the reclamation exists
        if (!reclamation) {
            return res.status(404).json({ message: "Reclamation not found" });
        }

        // Update the reclamation fields
        reclamation.state = state;
        reclamation.response = response;
      

        // Save the updated reclamation
        const updatedReclamation = await reclamation.save();

        // Send response with the updated reclamation
        res.status(200).json({ reclamation: updatedReclamation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

router.put("/updateadmin/:adminId", async (req, res) => {
    try {
        const { email,nom_complet, phone, address } = req.body;
        const adminId = req.params.adminId;

        // Find the admin by ID
        const admin = await Admin.findById(adminId);

        // Check if the admin exists
        if (!admin) {
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
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
router.get('/allreclamations', async (req, res) => {
    try {
      const reclamations = await Reclamation.find();
      res.json({ reclamations });
    } catch (error) {
      console.error('Failed to fetch all reclamations:', error);
      res.status(500).json({ message: 'Failed to fetch all reclamations' });
    }
  });

router.get("/getreclamation/:id", async (req, res) => {
    try {
        const reclamations = await Reclamation.find({ user: req.params.id });

        if (reclamations.length !== 0) {
            res.status(200).json({ reclamations });
        } else {
            res.status(200).json({ message: "No reclamations found for this user" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
router.delete("/deleterec/:reclamationId", async (req, res) => {
    try {
        const reclamationId = req.params.reclamationId;

        const deletedReclamation = await Reclamation.findByIdAndDelete(reclamationId);

        if (!deletedReclamation) {
            return res.status(404).json({ message: "Reclamation not found" });
        }

        res.status(200).json({ message: "Reclamation deleted successfully", reclamation: deletedReclamation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

module.exports = router;