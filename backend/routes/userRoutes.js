const express = require("express");
const {
  login,
  register,
  logout,
  getAllTodos,
  updateUserName,
  updateUserEmail,
  getProfile,
  updateUserAvatar,
} = require("../controllers/userControllers");
const { isAuthenticated } = require("../middleWares/auth");

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(isAuthenticated, logout);

router.route("/me").get(isAuthenticated, getProfile);

router.route("/my/todos").get(isAuthenticated, getAllTodos);

router.route("/update/my/name").patch(isAuthenticated, updateUserName);

router.route("/update/my/email").patch(isAuthenticated, updateUserEmail);
router.route("/update/my/avatar").patch(isAuthenticated, updateUserAvatar);

module.exports = router;
