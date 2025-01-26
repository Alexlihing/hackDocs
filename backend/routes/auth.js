const express = require("express");
const router = express.Router();
const passport = require("passport");

// Route to start Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: true }),
  (req, res) => {
    // Successful authentication, redirect to frontend.
    res.redirect(`http://localhost:5173/Home`);
  }
);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error("OAuth2 Error:", err); // Log the full error
  res.status(500).send({ message: "OAuth authentication failed", error: err });
});

module.exports = router;
