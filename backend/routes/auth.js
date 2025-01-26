const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

router.post("/user", async (req, res) => {
  //input validation with joi.

  const userDetails = req.body.userDetails;

  const userEmail = userDetails.email;

  const user = await User.findOne({ email: userEmail });

  if (user) {
    res.status(200).send(user);
  } else {
    res.status(400).send("user not found");
  }
});

module.exports = router;
