const mongoose = require("mongoose");

const workSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 255,
    },
    imageUrl: {
      type: String,
      required: true,
      maxlength: 255,
    },
    // The categoryId and userId fields will reference other documents
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true, // Assuming you want to enforce this relationship
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Assuming you want to enforce this relationship
    },
  },
  {
    timestamps: false,
  }
);

const Work = mongoose.model("Work", workSchema);

module.exports = Work;
