const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      maxlength: 255,
    },
  },
  {
    timestamps: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
