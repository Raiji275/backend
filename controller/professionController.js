const Profession = require('../models/desc-profession');

// Get all professions
exports.getAllProfessions = async (req, res) => {
  try {
    const professions = await Profession.find({});
    res.set("Content-Type", "application/json");
    res.json(professions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching professions' });
  }
};

exports.getProfessionsByType = async (req, res) => {
  try {
    const type = req.params.type;
    const professions = await Profession.find({ type });
    res.set("Content-Type", "application/json");
    res.json(professions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching professions by type' });
  }
};