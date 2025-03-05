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
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: "Explorer",
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",

    validate: {
      validator: (v) => validator.isURL(v),
      message: "link invalido",
    },
  },
});

module.exports = mongoose.model("User", userSchema);
