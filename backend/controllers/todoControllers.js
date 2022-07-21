const Todo = require("../models/todoModel");
const User = require("../models/userModel");

exports.createTodo = async (req, res) => {
  try {
    const newTodoData = {
      todo: req.body.todo,
      owner: req.user._id,
    };

    const newTodo = await Todo.create(newTodoData);

    const user = await User.findById(req.user._id);

    user.todos.unshift(newTodo._id);

    await user.save();

    res.status(201).json({
      success: true,
      todo: newTodo,
      message: "Todo created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    if (todo.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await todo.remove();

    const user = await User.findById(req.user._id);

    const index = user.todos.indexOf(req.params.id);
    user.todos.splice(index, 1);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Todo deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    if (todo.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    todo.todo = req.body.todo;
    await todo.save();
    res.status(200).json({
      success: true,
      message: "Todo updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
