const express = require("express");
const auth = require("../middlewares/auth");
const { getUserProfile } = require("../controllers/user");

const router = express.Router();

router.get("/users/me", auth, getUserProfile);

module.exports = router;
