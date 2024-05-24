const router = require("express").Router();
const User = require("../models/User");

const bcrypt = require("bcrypt");

//sign-up
//sign-up
router.post("/signup", async (req, res) => {
  try {
      const { email, number, numberu } = req.body;

      // Check if the user with the provided email already exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
      }

      // User does not exist, proceed with creating a new user
      const salt = bcrypt.genSaltSync(10);
      const hashpass = bcrypt.hashSync(number, salt);
      const user = new User({ email, number:hashpass, numberu });
      const savedUser = await user.save();
      res.status(200).json({ user: savedUser });
  } catch (error) {
      console.error("Error saving user:", error.message); // Log the error message
      res.status(500).json({ message: "Internal Server Error" });
  }
});

//login
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(200).json({ message: "Wrong email or email doesn't exist" });
      }
  
      const reqNumber = req.body.number.trim(); 
      const userNumber = String(user.number).trim(); 
  
      console.log('Request number:', reqNumber);
      console.log('User number:', userNumber);
  
   
      const isNumberCorrect = reqNumber === userNumber;
  
      console.log('Is number correct?', isNumberCorrect);
  
      if (!isNumberCorrect) {
        return res.status(200).json({ message: "Wrong number or number doesn't exist" });
      }
  
     
      const { number, ...others } = user._doc; 
      return res.status(200).json({ others, message: "Welcome to Mobilis" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });
  
// GET all users
router.get("/getusers", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


router.get("/user/:id", async (req, res) => {
  try {
    const userData = await User.findById(req.params.id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


module.exports = router;