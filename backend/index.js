const express = require("express");

const passport = require("passport");
require("./middlewear/passport.js");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

require("dotenv").config();

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: ["http://localhost:5173"], // Frontend URL
    credentials: true, // Allow cookies (important for sessions)
  })
);

// Middleware for parsing JSON requests
app.use(express.json());

// Session Configuration
app.use(
  session({
    secret: "fu",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to `true` if using HTTPS
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB (replace with your own database URI)
mongoose
  .connect("mongodb+srv://alexli9132:Test@innovateher.2k59h.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Import Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const mapsRoutes = require("./routes/maps");
const openAiRoutes = require("./routes/openAI.js");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/maps", mapsRoutes);
app.use("/api/chatbot", openAiRoutes);

// Start Server
app.listen(3011, () => {
  console.log("Server running on http://localhost:3011");
});
