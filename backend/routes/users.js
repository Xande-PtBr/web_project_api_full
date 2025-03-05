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

router.get("/me", auth, getUserProfile);

router.get("/:userId", getUserById);

router.get("/", getUsers);

router.post("/", createUser);

router.patch("/me", auth, updateUser);

router.patch("/me/avatar", auth, updateAvatar);

router.delete("/:userId", auth, deleteUser);

module.exports = router;
