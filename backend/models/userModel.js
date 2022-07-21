const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: [true, "Email already in use"],
  },

  avatar: {
    public_id: String,
    url: String,
  },
  password: {
    type: String,
  },
  todos: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
