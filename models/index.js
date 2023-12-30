const mongoose = require("mongoose");
const dbConfig = require("../config/db.config");

// Connexion à MongoDB
mongoose
  .connect(dbConfig.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connexion réussie à MongoDB.");
  })
  .catch((err) => {
    console.error("Erreur de connexion à MongoDB:", err);
    process.exit();
  });

const db = {};

db.mongoose = mongoose;
db.User = require("./users.model.js"); // Vous importez directement le modèle Mongoose
db.Work = require("./works.model.js"); // Assurez-vous que works.model.js est aussi un modèle Mongoose
db.Category = require("./categories.model.js"); // Assurez-vous que categories.model.js est aussi un modèle Mongoose

module.exports = db;
