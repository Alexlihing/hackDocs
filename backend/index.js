const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const users = require("./routes/users");
const maps = require("./routes/maps");
const auth = require("../backend/routes/auth");

const mongoose = require("mongoose");

//add mongoose compass connection logic
//or add other database connection logic

mongoose
  .connect("mongodb+srv://alexli9132:Test@innovateher.2k59h.mongodb.net/")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(cors());
app.use(express.json());

//add mongoose compass connection logic

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/users", users);
app.use("/api/maps", maps);
app.use("/api/auth/", auth); //http://localhost:3011/api/auth/user 

app.listen(3011, () => {
  console.log("listening on port 3011");
});
