//add model logic
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  medicines: {
    type: Array,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
