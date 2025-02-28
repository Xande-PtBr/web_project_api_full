const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (value) => validator.isEmail(value),
    nessage: "Email invalido",
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    default: "Explorer",
  },
  avatar: {
    type: String,
    default: "https://some-default-link.com/avatar.png",
  },
});

module.exports = mongoose.model("User", userSchema);
