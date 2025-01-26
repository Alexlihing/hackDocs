const express = require("express");
const router = express.Router();
const authLog = require("../middlewear/authLog");
const { User } = require("../models/user");

// Route to get user profile
router.get("/profile", authLog, (req, res) => {
  const user = req.user;
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Route to add medicine
router.post("/addmedicine", authLog, async (req, res) => {
  console.log("Add Medicine Request:", req.body);
  console.log("Authenticated User:", req.user);

  const medicineName = req.body.medicineName;

  // Check for missing medicine name
  if (!medicineName) {
    console.log("Missing medicine name");
    return res.status(400).json({ message: "Missing medicine name" });
  }

  // Ensure there is an authenticated user
  if (!req.user) {
    console.log("No authenticated user");
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Add the medicine to the user's list
    req.user.medicines.push(medicineName);

    // Use await to handle the promise from save
    await req.user.save();

    console.log("Medicine added successfully");
    res.status(200).json({
      message: "Medicine added successfully",
      medicines: req.user.medicines,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Unexpected error", error: error.message });
  }
});

module.exports = router;
