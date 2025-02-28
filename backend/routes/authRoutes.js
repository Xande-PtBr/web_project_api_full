const express = require("express");
const { createUser, login } = require("../controllers/auth");
const { validateSignup, validateSignin } = require("../middlewares/validation");

const router = express.Router();

router.post("/signup", validateSignup, createUser);
router.post("/signin", validateSignin, login);

module.exports = router;
