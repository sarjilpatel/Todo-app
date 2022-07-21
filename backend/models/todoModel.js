const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    todo: {
      type: String,
      trim: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
