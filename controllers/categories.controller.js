const db = require("./../models");
const Category = db.Category; // Assurez-vous que le modèle est exporté en tant que 'Category' dans models/index.js

// Récupérer toutes les catégories
exports.findAll = async (req, res) => {
  try {
    const categories = await Category.find(); // Utilisez 'find' sans arguments pour récupérer tous les documents
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({ error: "Une erreur est survenue" });
  }
};

// Créer une nouvelle catégorie
exports.create = async (req, res) => {
  // Créez un nouvel objet Category avec les données de la requête
  const category = new Category({
    name: req.body.name,
  });

  try {
    // Sauvegardez la nouvelle catégorie dans la base de données
    const savedCategory = await category.save();
    return res.status(201).json(savedCategory);
  } catch (err) {
    return res.status(500).json({ error: "Une erreur est survenue lors de la création de la catégorie" });
  }
};
