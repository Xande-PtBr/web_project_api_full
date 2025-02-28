const { Router } = require("express");
const auth = require("../middlewares/auth");

const router = new Router();
const {
  getUserProfile,
  getUserById,
  getUsers,
  createUser,
  updateUser,
  updateAvatar,
  deleteUser,
} = require("../controllers/users");

router.get("/users/me", auth, getUserProfile);

router.get("/:userId", getUserById);

router.get("/", getUsers);

router.post("/", createUser);

router.patch("/me", updateUser);

router.patch("/me/avatar", updateAvatar);

router.delete("/:userId", deleteUser);

module.exports = router;
