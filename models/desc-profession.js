const mongoose = require('mongoose');

const professionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
});

module.exports = mongoose.model('desc-profession', professionSchema);