const mongoose = require('mongoose');

const professionsSchema = new mongoose.Schema({
  name: String,
  values: [{ type: String }]
});

module.exports = mongoose.model('Professions', professionsSchema);