const express = require("express");
const {
  createTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoControllers");
const { isAuthenticated } = require("../middleWares/auth");

const router = express.Router();

router
  .route("/todos/:id")
  .delete(isAuthenticated, deleteTodo)
  .put(isAuthenticated, updateTodo);
router.route("/todos").post(isAuthenticated, createTodo);

module.exports = router;
