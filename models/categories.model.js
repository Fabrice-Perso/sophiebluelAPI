const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    // MongoDB créera automatiquement un champ _id qui sera utilisé comme clé primaire
    name: {
      type: String,
      required: true, // équivalent de allowNull: false dans Sequelize
      unique: true, // pour s'assurer que le nom est unique
      maxlength: 255, // pour définir la longueur maximale du varchar, similaire à varchar(255)
    },
  },
  {
    timestamps: false, // pour indiquer que nous ne voulons pas de timestamps automatiques
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
