const db = require("./../models");
const Work = db.Work; // Utilisez le modèle Mongoose pour 'Work'

exports.findAll = async (req, res) => {
  try {
    // Utilisez '.populate()' pour inclure les informations de la catégorie
    const works = await Work.find().populate("category");
    return res.status(200).json(works);
  } catch (err) {
    return res.status(500).json({ error: "Une erreur est survenue" });
  }
};

exports.create = async (req, res) => {
  const host = req.get("host");
  const title = req.body.title;
  const categoryId = req.body.category;
  const userId = req.auth.userId; // Assurez-vous que l'authentification est correctement configurée
  const imageUrl = `${req.protocol}://${host}/images/${req.file.filename}`;

  try {
    const work = new Work({
      title,
      imageUrl,
      categoryId,
      userId,
    });
    const savedWork = await work.save();
    return res.status(201).json(savedWork);
  } catch (err) {
    return res.status(500).json({ error: "Une erreur est survenue lors de la création de l'œuvre" });
  }
};

exports.delete = async (req, res) => {
  try {
    await Work.findByIdAndRemove(req.params.id);
    return res.status(204).json({ message: "Œuvre supprimée avec succès" });
  } catch (err) {
    return res.status(500).json({ error: "Une erreur est survenue" });
  }
};
