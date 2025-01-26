const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const users = require("./routes/users");
const maps = require("./routes/maps");
const auth = require("../backend/routes/auth");
const openAI = require("./routes/openAI");

const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env

// MongoDB connection using .env
const mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@innovateher.2k59h.mongodb.net/`;

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/users", users);
app.use("/api/maps", maps);
app.use("/api/auth/", auth); // http://localhost:3011/api/auth/user
app.use("/api/chatbot", openAI);

app.listen(3011, () => {
  console.log("listening on port 3011");
});
