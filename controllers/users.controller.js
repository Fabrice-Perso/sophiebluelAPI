const db = require("./../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = db.User; // Assurez-vous que le modèle est exporté en tant que 'User' dans models/index.js

exports.signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      message: "L'email et le mot de passe sont requis",
    });
  }
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    await user.save();
    return res.status(201).json({ message: "Utilisateur créé" });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    } else {
      const valid = await bcrypt.compare(req.body.password, user.password);
      if (!valid) {
        return res.status(401).json({ error: "Non autorisé" });
      }
      return res.status(200).json({
        userId: user._id, // Notez que Mongoose utilise _id au lieu de id
        token: jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, { expiresIn: "24h" }),
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
