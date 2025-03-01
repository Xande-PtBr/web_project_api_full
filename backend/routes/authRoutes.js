const express = require("express");
const { createUser, login } = require("../controllers/users");
const { validateSignup, validateSignin } = require("../middlewares/validation");

const router = express.Router();

router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("O servidor travará agora");
  }, 0);
});

router.post("/signup", validateSignup, createUser);
router.post("/signin", validateSignin, login);

module.exports = router;
